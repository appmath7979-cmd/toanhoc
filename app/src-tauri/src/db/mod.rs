use rusqlite::Connection;
use std::path::Path;
use std::sync::{Mutex, MutexGuard};

pub mod customer;
pub mod message;
pub mod queue;
pub mod setting;

pub struct AppDb(pub Mutex<Connection>);

pub(crate) fn err<E: ToString>(e: E) -> String {
    e.to_string()
}

pub(crate) fn lock(db: &AppDb) -> Result<MutexGuard<'_, Connection>, String> {
    db.0.lock().map_err(err)
}

const MIGRATIONS: &[&str] = &[include_str!("../../migrations/001_init.sql")];

pub fn open(path: &Path) -> rusqlite::Result<Connection> {
    let conn = Connection::open(path)?;
    conn.execute_batch("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;")?;

    let current: i64 = conn.query_row("PRAGMA user_version", [], |r| r.get(0))?;
    for (i, sql) in MIGRATIONS.iter().enumerate() {
        let version = i as i64 + 1;
        if current < version {
            conn.execute_batch(&format!(
                "BEGIN; {sql}\nPRAGMA user_version = {version}; COMMIT;"
            ))?;
        }
    }
    Ok(conn)
}
