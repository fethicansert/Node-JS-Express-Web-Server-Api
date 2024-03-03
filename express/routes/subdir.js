const express = require('express');
const router = express.Router(); //Creates a new router object.
const path = require('path');

//express automaticly send status code and content type

router.get('^/$|/index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html')); //__dirname if this file express/views
});


router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})



module.exports = router;