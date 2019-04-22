var router = require('express').Router();

router.use('/patient/', require('./patient'));

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;