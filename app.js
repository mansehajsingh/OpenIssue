/* require dependencies */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const { sequelize } = require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./logger");
const https = require("https");
const fs = require("fs");

/* important inits */
const app = express();
PORT = process.env.PORT;
HOSTNAME = process.env.HOSTNAME;

/* middlewares */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public", "dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

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

process.on('uncaughtException', function (err) {
    logger.log(err);
});

server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/devwire.ca/key.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/devwire.ca/cert.pem'),
    //ca: fs.readFileSync('/etc/letsencrypt/live/devwire.ca/chain.pem'),
}, app);

server.listen(PORT, HOSTNAME, () => {
    console.log(`App is listening on port ${PORT}.`);
});