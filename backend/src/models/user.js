import { define } from "../db/db";
import { INTEGER, STRING } from "sequelize";

const user = define("users", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false,
    }
}, {underscored:true});

module.exports = user;