-- USERS
INSERT INTO users(email,password_hash) VALUES ("admin@vicino.pt","53C750F6382998BF3C75ED0F6EC0013D969CD3ED384AF2412FD85960A19AFE5B");

-- PICKING WAVES
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_1", "2020-12-02T10:30:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_2", "2020-12-08T11:00:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_3", "2020-12-18T15:40:00");

-- ITEMS
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BACALHOA", "Bacalhôa", 10, "ECL.2020.8", "A3A", "PW2020_1");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("VULCANICO", "Vulcânico", 25, "ECL.2020.8", "A3D", "PW2020_1");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("TONSDUORUM", "Tons Duorum", 30, "ECL.2020.8", "A2D", "PW2020_1");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("PAPAFIGOS", "Papa Figos", 25, "ECL.2020.8", "A1B", "PW2020_1");

INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BASTARDO", "Bastardo", 10, "ECL.2020.9", "A2C", "PW2020_2");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("BELAIGRAGRANDCRU", "Belaigra Grand Cru", 10, "ECL.2020.9", "A2B", "PW2020_2");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("CABRIZ", "Cabriz", 40, "ECL.2020.9", "A3C", "PW2020_2");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("EA", "EA", 10, "ECL.2020.9", "A0B", "PW2020_2");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("MARROSAS", "Mar de Rosas", 5, "ECL.2020.9", "A3C", "PW2020_2");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("MULAVELHA", "Mula Velha", 30, "ECL.2020.9", "A1A", "PW2020_2");

INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("ESPORAO", "Esporão", 20, "ECL.2020.10", "A0D", "PW2020_3");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("HERDADEPESO", "Herdade do Peso", 50, "ECL.2020.10", "A2C", "PW2020_3");
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, ref_picking) VALUES("JP", "JP", 1, "ECL.2020.10", "A2A", "PW2020_3");
