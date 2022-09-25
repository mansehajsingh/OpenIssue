/* require dependencies */
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();
const databaseConfiguration = require("./config/dbconfig.js");

/* important inits */
const sequelize = new Sequelize(databaseConfiguration[process.env.CONFIG_TYPE]);

module.exports.sequelize = sequelize;