require('dotenv').config()
const  Sequelize = require("sequelize");

if (!process.env.DB) {
    throw new Error("DB is missing!")
}

const db = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB,
    define: {
        timestamps: false
    }
})

db.authenticate().catch((err) => {
    throw new Error(`Unable to connect to the database, ${err}`)
})

module.exports = db;