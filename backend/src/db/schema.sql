PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

DROP TABLE IF EXISTS picking_waves;
CREATE TABLE picking_waves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL UNIQUE,
    final_date DATETIME NOT NULL
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL,
    product_name TEXT NOT NULL, --might not be useful
    quantity INT NOT NULL CHECK (quantity >= 0) DEFAULT 0,
    order_ref TEXT NOT NULL,
    warehouse_zone TEXT NOT NULL,
    ref_picking REFERENCES picking_waves (ref) NOT NULL
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;