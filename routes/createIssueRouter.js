const express = require('express');
const path = require('path');
const databaseController = require('../controllers/databaseController');
const { Project } = require('../models/project');
const { Session } = require("../models/session");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'createIssue.html'));
});

module.exports = router;