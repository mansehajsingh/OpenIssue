const express = require('express');
const path = require('path');
const { database } = require('pg/lib/defaults');
const databaseController = require('../controllers/databaseController');
const { Project } = require('../models/project');
const { Session } = require("../models/session");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'projectpage.html'));
});

router.post("/", (req, res) => {

    let session = new Session(req.body.username, req.body.session_id);

    let project = new Project(req.body.project_name, null, req.body.owner);

    databaseController.validateSession(session).then( isValid => {

        if(isValid === false) {
            res.send("invalid session");
        } else {

            databaseController.canViewProject(session, project).then( canView => {

                if(canView === false) {
                    res.send("unauthorized");
                } else {

                    databaseController.getProjectDetails(project).then( result => {
                        res.send(result);
                    });

                }

            });

        }

    });

})

module.exports = router;