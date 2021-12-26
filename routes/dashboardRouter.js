// require statements
const express = require("express");
const path = require('path');
const { Session } = require("../models/session");
const databaseController = require("../controllers/databaseController");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

router.post('/', (req, res) => {
    
    let session = new Session(req.body.username, req.body.session_id);

    databaseController.validateSession(session).then( isValid => {
        if(isValid === false) {
            res.send("fail");
        }
        else {
            databaseController.getProjects(req.body.username).then(projects => {
                res.send(projects);
            })
        }
    });

});

module.exports = router;