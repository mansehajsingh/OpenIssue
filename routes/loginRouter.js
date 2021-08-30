// require statements
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;