import { define } from "../db/db";
import picking_wave from "./picking_wave";
import { INTEGER, STRING } from "sequelize";

const item = define("items", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ref:{
        type: STRING,
        allowNull: false,
        unique: true
    },
    product_name:{
        type: STRING,
        allowNull: false
    },
    quantity:{
        type: INTEGER,
        allowNull: false
    },
    order_ref:{
        type: STRING,
        allowNull: false
    },
    warehouse_zone:{
        type: STRING,
        allowNull: false
    },
    id_picking: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: picking_wave,
            key: "id"
        }
    }
},{underscored:true});

item.belongsTo(picking_wave);

module.exports = item;