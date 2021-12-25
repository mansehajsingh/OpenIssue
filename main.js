// require statements
const express = require('express');

// requires for routers
const homeRouter = require("./routes/homeRouter.js");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const createRouter = require("./routes/createRouter");

const app = express();
const port = 5000;
const hostname = '0.0.0.0';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname)); // allows for the use of the public directory to serve static files

// use statements for project routers
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboardRouter);
app.use('/create-project', createRouter);

app.listen(port, hostname, () => {
    console.log(`App is listening on Port #${port}.`);
});