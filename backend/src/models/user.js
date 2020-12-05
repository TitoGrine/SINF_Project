const bcrypt = require("bcrypt");
const db = require("../db/db");
const { INTEGER, STRING } = require("sequelize");


const user = db.define("users", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: STRING,
        allowNull: false,
    }
}, {
    underscored: true,
});

user.prototype.checkPass = function checkPass (password, callback) {
    bcrypt.compare(password, this.password_hash, (err, match) => {
        if (err)
            return callback(err);
        
        return callback(null, match);
    });
}

module.exports = user;