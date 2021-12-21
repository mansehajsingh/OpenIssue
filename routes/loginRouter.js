// require statements
const express = require('express');
const path = require('path');
const { Account } = require('../models/account.js');
const { Session } = require('../models/session.js');
const databaseController = require('../controllers/databaseController');
const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');
const { database } = require('pg/lib/defaults');

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
            if(!compRes) { // if the compare fails the password was incorrect
                res.send("400");
            } 
            else {

                let session = new Session(
                    currAccount.username, 
                    uuidV4(), // generates a session id
                    new Date(Date.now() + (15 * 24 * 60 * 60 * 1000))
                ); 

                res.json({
                    username: session.username,
                    session_id: session.sessionID,
                }); // info to create a cookie client side

                databaseController.createSession(session); // create the session database side

            }
        });

    }).catch(() => {
        res.send('400');
    });
    
});

module.exports = router;