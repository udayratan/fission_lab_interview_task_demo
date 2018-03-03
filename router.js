var express = require('express');
var router = express.Router();
var Controller = require('./controller');


router.get('/', (req, res) => {
    res.render('index');
})
router.post('/uploadCSV', Controller.CSVParsing);

module.exports = router;