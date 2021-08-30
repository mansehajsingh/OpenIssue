// require statements
const express = require('express');

// requires for routers
const homeRouter = require("./routes/homeRouter.js")
const loginRouter = require("./routes/loginRouter")

const app = express();
const port = 5000;
const hostname = '0.0.0.0';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname)); // allows for the use of the public directory to serve static files

// use statements for project routers
app.use('/', homeRouter);
app.use('/login', loginRouter);

app.listen(port, hostname, () => {
    console.log(`App is listening on Port #${port}.`);
});