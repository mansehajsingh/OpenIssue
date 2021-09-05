// require statements
const express = require("express");
const path = require('path');
const { Account } = require('../models/account.js')
const databaseController = require('../controllers/databaseController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});

router.post('/', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    databaseController.isUsernameTaken(username).then(numOfRows => {
        if(numOfRows === 0) {
            databaseController.createUser(username, password);
            res.send("200");
        } else {
            res.send("400");
        }
    });
});

module.exports = router;