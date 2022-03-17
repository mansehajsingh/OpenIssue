/* require dependencies */
const express = require("express");
const dotenv = require("dotenv").config();

/* important inits */
const app = express();
PORT = process.env.PORT;
HOSTNAME = process.env.HOSTNAME;

/* middlewares */
app.use(express.json());

/* routes */

/* app boilerplate */
app.listen(PORT, HOSTNAME, () => {
    console.log(`App is listening on port ${PORT}.`);
});