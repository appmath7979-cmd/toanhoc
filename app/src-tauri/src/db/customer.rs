use super::queue::{enqueue, is_pending, QueueJob};
use super::{err, lock, AppDb};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use tauri::State;

#[derive(Serialize, Deserialize)]
pub struct Customer {
    pub id: String,
    pub full_name: String,
    pub is_guest: bool,
    pub active: bool,
    pub created_at: Option<String>,
    pub updated_at: String,
    #[serde(default)]
    pub pending: bool,
}

fn put(c: &Connection, x: &Customer, pending: bool) -> rusqlite::Result<()> {
    c.execute(
        "INSERT INTO customers (id, full_name, is_guest, active, created_at, updated_at, pending)
         VALUES (?1,?2,?3,?4,?5,?6,?7)
         ON CONFLICT(id) DO UPDATE SET
           full_name=?2, is_guest=?3, active=?4, updated_at=?6, pending=?7",
        params![
            x.id,
            x.full_name,
            x.is_guest,
            x.active,
            x.created_at,
            x.updated_at,
            pending
        ],
    )?;
    Ok(())
}

#[tauri::command]
pub async fn list_customers(db: State<'_, AppDb>) -> Result<Vec<Customer>, String> {
    let c = lock(&db)?;
    let mut st = c
        .prepare(
            "SELECT id, full_name, is_guest, active, created_at, updated_at, pending
             FROM customers ORDER BY full_name",
        )
        .map_err(err)?;
    let rows = st
        .query_map([], |r| {
            Ok(Customer {
                id: r.get(0)?,
                full_name: r.get(1)?,
                is_guest: r.get(2)?,
                active: r.get(3)?,
                created_at: r.get(4)?,
                updated_at: r.get(5)?,
                pending: r.get(6)?,
            })
        })
        .map_err(err)?;
    rows.collect::<Result<Vec<_>, _>>().map_err(err)
}

#[tauri::command]
pub async fn save_customer(
    db: State<'_, AppDb>,
    customer: Customer,
    job: QueueJob,
) -> Result<(), String> {
    let mut c = lock(&db)?;
    let tx = c.transaction().map_err(err)?;
    enqueue(&tx, &job).map_err(err)?;
    put(&tx, &customer, true).map_err(err)?;
    tx.commit().map_err(err)
}

#[tauri::command]
pub async fn apply_customer_from_server(
    db: State<'_, AppDb>,
    customer: Customer,
) -> Result<(), String> {
    let c = lock(&db)?;
    if is_pending(&c, "customers", &customer.id) {
        return Ok(());
    }
    put(&c, &customer, false).map_err(err)
}
