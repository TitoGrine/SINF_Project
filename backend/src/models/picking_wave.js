const db = require("../db/db");
const { DATE, INTEGER, STRING } = require("sequelize");

const picking_wave = db.define("picking_waves", {
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
    final_date: {
        type: DATE,
        allowNull: false,
    }
}, {underscored:true});

module.exports = picking_wave;