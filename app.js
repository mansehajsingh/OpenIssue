/* require dependencies */
const express = require("express");
const dotenv = require("dotenv").config();
const { sequelize } = require("./database");

/* important inits */
const app = express();
PORT = process.env.PORT;
HOSTNAME = process.env.HOSTNAME;

/* middlewares */
app.use(express.json());

/* app boilerplate */
(async function checkDBConnection() {
    try { 
        await sequelize.authenticate();
        console.log('Connection to postgres has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.listen(PORT, HOSTNAME, () => {
    console.log(`App is listening on port ${PORT}.`);
});