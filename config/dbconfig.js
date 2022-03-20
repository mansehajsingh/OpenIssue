/* require dependencies */
const dotenv = require("dotenv").config();

/* export configurations */
module.exports = {
    development: {
        database:   process.env.DB_DB,
        username:   process.env.DB_USERNAME,
        password:   process.env.DB_PASSWORD,
        host:       process.env.DB_HOST,
        port:       process.env.DB_PORT,
        dialect:    "postgres"
    },
    production: {
        database:   process.env.DB_DB,
        username:   process.env.DB_USERNAME,
        password:   process.env.DB_PASSWORD,
        host:       process.env.DB_HOST,
        port:       process.env.DB_PORT,
        dialect:    "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}