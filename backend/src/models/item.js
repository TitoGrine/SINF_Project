const db = require("../db/db");
const { INTEGER, STRING } = require("sequelize");
const picking_wave = require("./picking_wave");

const item = db.define("items", {
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
        allowNull: false,
        validate: {
            min: 0
        }
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

module.exports = item;