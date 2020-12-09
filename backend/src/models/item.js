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
    ref_picking: {
        type: STRING,
        allowNull: false,
        references: {
            model: picking_wave,
            key: "ref"
        }
    }
},{underscored:true});

module.exports = item;