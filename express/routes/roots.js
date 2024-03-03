const express = require('express');
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); //__dirname if this file express/views
}) 

router.get('/new-page(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html')); //__dirname if this file express/views
});

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
})

module.exports = router;