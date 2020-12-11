-- USERS
INSERT INTO users(email,password_hash) VALUES ("admin@vicino.pt","$2b$12$RLFiTSLLOWoOHZ2m5Awhi.GaAgNz2wJVwLZOaRy7KLRlB0FGphsdW");

-- PICKING WAVES
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_1", "2020-12-02T10:30:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_2", "2020-12-08T11:00:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_3", "2020-12-18T15:40:00");

-- ITEMS
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BACALHOA", 10, "ECL.2020.8", "A3A", "PW2020_1");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("VULCANICO", 25, "ECL.2020.8", "A3D", "PW2020_1");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("TONSDUORUM", 30, "ECL.2020.8", "A2D", "PW2020_1");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("PAPAFIGOS", 25, "ECL.2020.8", "A1B", "PW2020_1");

INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BASTARDO", 10, "ECL.2020.9", "A2C", "PW2020_2");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BELAIGRAGRANDCRU", 10, "ECL.2020.9", "A2B", "PW2020_2");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("CABRIZ", 40, "ECL.2020.9", "A3C", "PW2020_2");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("EA", 10, "ECL.2020.9", "A0B", "PW2020_2");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("MARROSAS", 5, "ECL.2020.9", "A3C", "PW2020_2");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("MULAVELHA", 30, "ECL.2020.9", "A1A", "PW2020_2");

INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("ESPORAO", 20, "ECL.2020.10", "A0D", "PW2020_3");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("HERDADEPESO", 50, "ECL.2020.10", "A2C", "PW2020_3");
INSERT INTO items(ref, quantity, order_ref, warehouse_zone, ref_picking) VALUES("JP", 1, "ECL.2020.10", "A2A", "PW2020_3");
