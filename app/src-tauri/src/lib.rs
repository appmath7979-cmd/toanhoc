mod db;
use db::AppDb;
use std::sync::Mutex;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&dir)?;
            let conn = db::open(&dir.join("app.db"))?;
            app.manage(AppDb(Mutex::new(conn)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            db::customer::list_customers,
            db::customer::save_customer,
            db::customer::apply_customer_from_server,
            db::setting::get_setting,
            db::setting::save_setting,
            db::setting::apply_setting_from_server,
            db::message::list_messages,
            db::message::save_message,
            db::message::apply_message_from_server,
            db::queue::queue_list,
            db::queue::queue_complete,
            db::queue::queue_fail,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
