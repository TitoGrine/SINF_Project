import { define } from "../db/db";
import { DATE, INTEGER, STRING } from "sequelize";

const picking_wave = define("picking_waves", {
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