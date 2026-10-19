use super::queue::{enqueue, is_pending, QueueJob};
use super::{err, lock, AppDb};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use tauri::State;

#[derive(Serialize, Deserialize, Clone)]
pub struct MessageDetail {
    pub id: String,
    pub message_id: String,
    pub bet_type: String,
    pub syntax: String,
    pub province: String,
    pub score: f64,
    pub co: f64,
    #[serde(default)]
    pub trung: f64,
    pub number: String,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct Message {
    pub id: String,
    pub customer_id: String,
    pub send: bool,
    pub at: String,
    pub content: String,
    pub region: Option<String>,
    #[serde(default)]
    pub message_details: Vec<MessageDetail>,
    pub created_at: Option<String>,
    pub updated_at: String,
    #[serde(default)]
    pub pending: bool,
}

fn put(c: &Connection, m: &Message, pending: bool) -> rusqlite::Result<()> {
    c.execute(
        "INSERT INTO messages (id, customer_id, send, at, content, region, created_at, updated_at, pending)
         VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)
         ON CONFLICT(id) DO UPDATE SET
           send=?3, at=?4, content=?5, region=?6, updated_at=?8, pending=?9",
        params![
            m.id, m.customer_id, m.send, m.at, m.content, m.region,
            m.created_at, m.updated_at, pending
        ],
    )?;
    c.execute("DELETE FROM message_details WHERE message_id = ?1", [&m.id])?;
    for d in &m.message_details {
        c.execute(
            "INSERT INTO message_details
               (id, message_id, bet_type, syntax, province, score, co, trung, number, created_at, updated_at)
             VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)",
            params![
                d.id, m.id, d.bet_type, d.syntax, d.province, d.score, d.co,
                d.trung, d.number, d.created_at, d.updated_at
            ],
        )?;
    }
    Ok(())
}

#[tauri::command]
pub async fn list_messages(
    db: State<'_, AppDb>,
    customer_id: String,
) -> Result<Vec<Message>, String> {
    let c = lock(&db)?;
    let mut st = c
        .prepare(
            "SELECT id, customer_id, send, at, content, region, created_at, updated_at, pending
             FROM messages WHERE customer_id = ?1 ORDER BY created_at",
        )
        .map_err(err)?;
    let mut msgs = st
        .query_map([&customer_id], |r| {
            Ok(Message {
                id: r.get(0)?,
                customer_id: r.get(1)?,
                send: r.get(2)?,
                at: r.get(3)?,
                content: r.get(4)?,
                region: r.get(5)?,
                created_at: r.get(6)?,
                updated_at: r.get(7)?,
                pending: r.get(8)?,
                message_details: vec![],
            })
        })
        .map_err(err)?
        .collect::<Result<Vec<_>, _>>()
        .map_err(err)?;

    let mut ds = c
        .prepare(
            "SELECT id, message_id, bet_type, syntax, province, score, co, trung, number, created_at, updated_at
             FROM message_details
             WHERE message_id IN (SELECT id FROM messages WHERE customer_id = ?1)",
        )
        .map_err(err)?;
    let details = ds
        .query_map([&customer_id], |r| {
            Ok(MessageDetail {
                id: r.get(0)?,
                message_id: r.get(1)?,
                bet_type: r.get(2)?,
                syntax: r.get(3)?,
                province: r.get(4)?,
                score: r.get(5)?,
                co: r.get(6)?,
                trung: r.get(7)?,
                number: r.get(8)?,
                created_at: r.get(9)?,
                updated_at: r.get(10)?,
            })
        })
        .map_err(err)?
        .collect::<Result<Vec<_>, _>>()
        .map_err(err)?;

    for m in &mut msgs {
        m.message_details = details
            .iter()
            .filter(|d| d.message_id == m.id)
            .cloned()
            .collect();
    }
    Ok(msgs)
}

#[tauri::command]
pub async fn save_message(
    db: State<'_, AppDb>,
    message: Message,
    job: QueueJob,
) -> Result<(), String> {
    let mut c = lock(&db)?;
    let tx = c.transaction().map_err(err)?;
    enqueue(&tx, &job).map_err(err)?;
    put(&tx, &message, true).map_err(err)?;
    tx.commit().map_err(err)
}

#[tauri::command]
pub async fn apply_message_from_server(
    db: State<'_, AppDb>,
    message: Message,
) -> Result<(), String> {
    let mut c = lock(&db)?;
    if is_pending(&c, "messages", &message.id) {
        return Ok(());
    }
    let tx = c.transaction().map_err(err)?;
    put(&tx, &message, false).map_err(err)?;
    tx.commit().map_err(err)
}
