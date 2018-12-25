var router = require('express').Router();
var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');

router.get('/', function(req, res, next) {
    res.send('P"s API is working properly');
});

router.get('/all', function(req,res, next) {
    Patient.find({}, function(err, patients) {
        console.log('sending..');
        return res.json({data: patients});
    });
});

router.post('/', function(req, res, next) {
    var patient = new Patient();

    console.log(req.body);
    patient.name = req.body.patient.name;
    patient.nric = req.body.patient.nric;
    patient.gender = req.body.patient.gender;
    patient.dateOfBirth = req.body.patient.dateOfBirth;
    patient.contact = req.body.patient.contact;
    patient.address = req.body.patient.address;
    patient.zipCode = req.body.patient.zipCode;
    patient.occupation = req.body.patient.occupation;
    patient.maritalStatus = req.body.patient.maritalStatus;
    patient.knownHealthIssues = req.body.patient.knownHealthIssue;
    patient.nokName = req.body.patient.nokName;
    patient.nokRelation = req.body.patient.nokRelation;
    patient.nokAddress = req.body.patient.nokAddress;
    patient.nokContact = req.body.patient.nokContact;

    return patient.save().then(function() {
        return res.json({msg: "patient added"});
    }).catch(next);
});

module.exports = router;