use super::queue::{enqueue, is_pending, QueueJob};
use super::{err, lock, AppDb};
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::State;

#[derive(Serialize, Deserialize)]
pub struct Setting {
    pub id: String,
    pub customer_id: String,
    pub xien_mb: bool,
    pub dax_t: Option<String>,
    pub bets: Value,
    pub created_at: Option<String>,
    pub updated_at: String,
    #[serde(default)]
    pub pending: bool,
}

fn put(c: &Connection, x: &Setting, pending: bool) -> rusqlite::Result<()> {
    c.execute(
        "INSERT INTO settings (id, customer_id, xien_mb, dax_t, bets, created_at, updated_at, pending)
         VALUES (?1,?2,?3,?4,?5,?6,?7,?8)
         ON CONFLICT(id) DO UPDATE SET
           xien_mb=?3, dax_t=?4, bets=?5, updated_at=?7, pending=?8",
        params![
            x.id, x.customer_id, x.xien_mb, x.dax_t, x.bets.to_string(),
            x.created_at, x.updated_at, pending
        ],
    )?;
    Ok(())
}

#[tauri::command]
pub async fn get_setting(
    db: State<'_, AppDb>,
    customer_id: String,
) -> Result<Option<Setting>, String> {
    let c = lock(&db)?;
    c.query_row(
        "SELECT id, customer_id, xien_mb, dax_t, bets, created_at, updated_at, pending
         FROM settings WHERE customer_id = ?1",
        [&customer_id],
        |r| {
            let bets: String = r.get(4)?;
            Ok(Setting {
                id: r.get(0)?,
                customer_id: r.get(1)?,
                xien_mb: r.get(2)?,
                dax_t: r.get(3)?,
                bets: serde_json::from_str(&bets).unwrap_or(Value::Array(vec![])),
                created_at: r.get(5)?,
                updated_at: r.get(6)?,
                pending: r.get(7)?,
            })
        },
    )
    .optional()
    .map_err(err)
}

#[tauri::command]
pub async fn save_setting(
    db: State<'_, AppDb>,
    setting: Setting,
    job: QueueJob,
) -> Result<(), String> {
    let mut c = lock(&db)?;
    let tx = c.transaction().map_err(err)?;
    enqueue(&tx, &job).map_err(err)?;
    put(&tx, &setting, true).map_err(err)?;
    tx.commit().map_err(err)
}

#[tauri::command]
pub async fn apply_setting_from_server(
    db: State<'_, AppDb>,
    setting: Setting,
) -> Result<(), String> {
    let c = lock(&db)?;
    if is_pending(&c, "settings", &setting.id) {
        return Ok(());
    }
    put(&c, &setting, false).map_err(err)
}
