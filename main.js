// require statements
const express = require('express');

// requires for routers
const homeRouter = require("./routes/homeRouter.js")

const app = express();
const port = 5000;

app.use(express.static(__dirname)); // allows for the use of the public directory to serve static files

// use statements for project routers
app.use('/', homeRouter);

app.listen(port, () => {
    console.log(`App is listening on Port #${port}.`);
});