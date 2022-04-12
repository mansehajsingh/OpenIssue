/* require dependencies */
const dotenv = require("dotenv").config();

/* export configurations */
module.exports = {
    development: {
        database:   process.env.DEV_DB,
        username:   process.env.DEV_DB_USERNAME,
        password:   process.env.DEV_DB_PASSWORD,
        host:       process.env.DEV_DB_HOST,
        port:       process.env.DEV_DB_PORT,
        dialect:    "postgres",
        logging:     false,
    },
    production: {
        database:   process.env.DB_DB,
        username:   process.env.DB_USERNAME,
        password:   process.env.DB_PASSWORD,
        host:       process.env.DB_HOST,
        port:       process.env.DB_PORT,
        dialect:    "postgres",
        logging:    false,
        dialectOptions: {
            ssl: {
                require:            true,
                rejectUnauthorized: false
            }
        }
    }
}