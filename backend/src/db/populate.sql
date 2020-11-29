-- USERS
INSERT INTO users(email,password_hash) VALUES ("admin@vicino.pt","53C750F6382998BF3C75ED0F6EC0013D969CD3ED384AF2412FD85960A19AFE5B");

-- PICKING WAVES
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_1", "2020-12-2T10:30:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_2", "2020-12-8T11:00:00");
INSERT INTO picking_waves(ref,final_date) VALUES ("PW2020_3", "2020-12-18T15:40:00");

-- ITEMS
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("BACALHOA", "Bacalhôa", 10, "ECL.2020.8", "A3A", 1);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("VULCANICO", "Vulcânico", 25, "ECL.2020.8", "A3D", 1);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("TONSDUORUM", "Tons Duorum", 30, "ECL.2020.8", "A2D", 1);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("PAPAFIGOS", "Papa Figos", 25, "ECL.2020.8", "A1B", 1);

INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("BASTARDO", "Bastardo", 10, "ECL.2020.9", "A2C", 2);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("BELAIGRAGRANDCRU", "Belaigra Grand Cru", 10, "ECL.2020.9", "A2B", 2);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("CABRIZ", "Cabriz", 40, "ECL.2020.9", "A3C", 2);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("EA", "EA", 10, "ECL.2020.9", "A0B", 2);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("MARROSAS", "Mar de Rosas", 5, "ECL.2020.9", "A3C", 2);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("MULAVELHA", "Mula Velha", 30, "ECL.2020.9", "A1A", 2);

INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("ESPORAO", "Esporão", 20, "ECL.2020.10", "A0D", 3);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("HERDADEPESO", "Herdade do Peso", 50, "ECL.2020.10", "A2C",3);
INSERT INTO items(ref, product_name, quantity, order_ref, warehouse_zone, id_picking) VALUES("JP", "JP", 1, "ECL.2020.10", "A2A", 3);
