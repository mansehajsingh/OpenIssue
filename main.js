// require statements
const express = require('express');
const dbcont = require('./controllers/databaseController');

// requires for routers
const homeRouter = require("./routes/homeRouter.js")
const loginRouter = require("./routes/loginRouter")

const app = express();
const port = 5000;
const hostname = '0.0.0.0';

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname)); // allows for the use of the public directory to serve static files

// use statements for project routers
app.use('/', homeRouter);
app.use('/login', loginRouter);

const bcrypt = require('bcrypt');

app.listen(port, hostname, () => {
    console.log(`App is listening on Port #${port}.`);
});