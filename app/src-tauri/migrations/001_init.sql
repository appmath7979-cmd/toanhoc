CREATE TABLE IF NOT EXISTS customers (
  id         TEXT PRIMARY KEY,
  full_name  TEXT NOT NULL,
  is_guest   INTEGER NOT NULL DEFAULT 0,
  active     INTEGER NOT NULL DEFAULT 1,
  created_at TEXT,
  updated_at TEXT NOT NULL,
  pending    INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(full_name);

CREATE TABLE IF NOT EXISTS settings (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL UNIQUE,
  xien_mb     INTEGER NOT NULL DEFAULT 0,
  dax_t       TEXT,                          -- ONE | HALF | MANY
  bets        TEXT NOT NULL DEFAULT '[]',    -- JSON mảng BetPair
  created_at  TEXT,
  updated_at  TEXT NOT NULL,
  pending     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  send        INTEGER NOT NULL DEFAULT 0,
  at          TEXT NOT NULL,
  content     TEXT NOT NULL,
  region      TEXT,                          -- mb | mt | mn
  created_at  TEXT,
  updated_at  TEXT NOT NULL,
  pending     INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_messages_customer ON messages(customer_id, created_at);

CREATE TABLE IF NOT EXISTS message_details (
  id         TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  bet_type   TEXT NOT NULL,
  syntax     TEXT NOT NULL,
  province   TEXT NOT NULL,
  score      REAL NOT NULL,
  co         REAL NOT NULL,
  trung      REAL NOT NULL DEFAULT 0,
  number     TEXT NOT NULL,
  created_at TEXT,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_details_message ON message_details(message_id);

CREATE TABLE IF NOT EXISTS pending (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL UNIQUE,
  action     TEXT NOT NULL,   -- create_customer | update_customer | put_setting | create_message
  entity_id  TEXT NOT NULL,   -- id của khách/setting/tin nhắn mà job này tác động
  payload    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'queued',
  error      TEXT,
  created_at TEXT NOT NULL
);
