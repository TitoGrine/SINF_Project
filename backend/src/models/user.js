const db = require("../db/db");
const { INTEGER, STRING } = require("sequelize");

const user = db.define("users", {
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