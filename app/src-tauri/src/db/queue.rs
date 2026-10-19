use super::{err, lock, AppDb};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::State;

#[derive(Deserialize)]
pub struct QueueJob {
    pub request_id: String,
    pub action: String,
    pub entity_id: String,
    pub payload: Value,
}

#[derive(Serialize)]
pub struct Job {
    pub id: i64,
    pub request_id: String,
    pub action: String,
    pub entity_id: String,
    pub payload: Value,
}

pub(crate) fn enqueue(c: &Connection, j: &QueueJob) -> rusqlite::Result<()> {
    c.execute(
        "INSERT INTO pending (request_id, action, entity_id, payload, created_at)
         VALUES (?1, ?2, ?3, ?4, strftime('%Y-%m-%dT%H:%M:%fZ','now'))",
        params![j.request_id, j.action, j.entity_id, j.payload.to_string()],
    )?;
    Ok(())
}

pub(crate) fn is_pending(c: &Connection, table: &str, id: &str) -> bool {
    c.query_row(
        &format!("SELECT pending FROM {table} WHERE id = ?1"),
        [id],
        |r| r.get::<_, bool>(0),
    )
    .unwrap_or(false)
}

#[tauri::command]
pub async fn queue_list(db: State<'_, AppDb>) -> Result<Vec<Job>, String> {
    let c = lock(&db)?;
    let mut st = c
        .prepare(
            "SELECT id, request_id, action, entity_id, payload
             FROM pending WHERE status = 'queued' ORDER BY id",
        )
        .map_err(err)?;
    let rows = st
        .query_map([], |r| {
            let payload: String = r.get(4)?;
            Ok(Job {
                id: r.get(0)?,
                request_id: r.get(1)?,
                action: r.get(2)?,
                entity_id: r.get(3)?,
                payload: serde_json::from_str(&payload).unwrap_or(Value::Null),
            })
        })
        .map_err(err)?;
    rows.collect::<Result<Vec<_>, _>>().map_err(err)
}

#[tauri::command]
pub async fn queue_complete(
    db: State<'_, AppDb>,
    job_id: i64,
    entity_id: String,
) -> Result<(), String> {
    let mut c = lock(&db)?;
    let tx = c.transaction().map_err(err)?;
    tx.execute("DELETE FROM pending WHERE id = ?1", [job_id])
        .map_err(err)?;
    for t in ["customers", "settings", "messages"] {
        tx.execute(
            &format!(
                "UPDATE {t} SET pending = EXISTS(
                   SELECT 1 FROM pending
                   WHERE entity_id = {t}.id AND status IN ('queued','failed')
                 ) WHERE id = ?1"
            ),
            [&entity_id],
        )
        .map_err(err)?;
    }
    tx.commit().map_err(err)
}

#[tauri::command]
pub async fn queue_fail(db: State<'_, AppDb>, job_id: i64, error: String) -> Result<(), String> {
    let c = lock(&db)?;
    c.execute(
        "UPDATE pending SET status = 'failed', error = ?2 WHERE id = ?1",
        params![job_id, error],
    )
    .map_err(err)?;
    Ok(())
}
