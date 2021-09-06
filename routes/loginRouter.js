// require statements
const express = require('express');
const path = require('path');
const { Account } = require('../models/account.js')
const databaseController = require('../controllers/databaseController');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    let currAccount = new Account(username, password);
    databaseController.getPasswordHash(currAccount.username).then(hash => {
        let hashedPassword = hash;
        bcrypt.compare(currAccount.password, hashedPassword, (err, compRes) => {
            if(!compRes) {
                res.send('400');
            } else {
                res.send('200');
            }
        });

    }).catch(() => {
        res.send('400');
    });
    
});

module.exports = router;