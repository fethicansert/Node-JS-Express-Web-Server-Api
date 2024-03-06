const express = require('express');
const router = express.Router()
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log(req.headers.origin);
    console.log("Hello");
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); //__dirname if this file express/views
}) 

module.exports = router;