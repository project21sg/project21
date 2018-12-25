var router = require('express').Router();

router.use('/patients/', require('./patients'));

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;