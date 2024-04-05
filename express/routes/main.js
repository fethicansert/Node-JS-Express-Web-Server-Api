const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|/main(.html)?', (req, res) => {
    // res.json({usermame: req.user});
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});


module.exports = router;