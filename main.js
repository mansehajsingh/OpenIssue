// require statements
const express = require('express');
const session = require('express-session');

// requires for routers
const homeRouter = require("./routes/homeRouter.js");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");

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

app.listen(port, hostname, () => {
    console.log(`App is listening on Port #${port}.`);
});

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>