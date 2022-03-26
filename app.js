/* require dependencies */
const express = require("express");
const dotenv = require("dotenv").config();
const { sequelize } = require("./database");
const router = require("./routes")

/* important inits */
const app = express();
PORT = process.env.PORT;
HOSTNAME = process.env.HOSTNAME;

/* middlewares */
app.use(express.static("public"));
app.use(express.json());

/* router setup */
app.use("/", router);

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