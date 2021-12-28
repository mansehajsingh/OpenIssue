const express = require('express');
const path = require('path');
const databaseController = require('../controllers/databaseController');
const { Project } = require('../models/project');
const { Session } = require("../models/session");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'create.html'));
});

router.post('/', (req, res) => {

    let session = new Session(req.body.username, req.body.session_id);

    databaseController.validateSession(session).then( isValid => {

        if(isValid === false) {
            res.send("fail");
        }
        
    });

});

router.post('/create', (req, res) => {
    let project = new Project(req.body.project_name, req.body.project_description, req.body.username);

    databaseController.isProjectNameAvailable(project).then( isAvailable => {

        if(isAvailable === true) {
            databaseController.createProject(project);
            res.send("success");
        } else {
            res.send("taken");
        }
    });
    
});

module.exports = router;