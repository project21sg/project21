var router = require('express').Router();
var mongoose = require('mongoose');
var mysql = require('../../db/mysqldb');
var Patient = mongoose.model('Patient');

router.get('/all', function(req,res, next) {
    Patient.find({}, function(err, patients) {
        console.log('Sending patient data to : ' + req.ip);
        return res.json({data: patients});
    });
});

//TODO: append user_id after accounts implemented 
router.route('/')
.post(function(req, res, next) {
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
    patient.knownHealthIssues = req.body.patient.knownHealthIssues;
    patient.nokName = req.body.patient.nokName;
    patient.nokRelation = req.body.patient.nokRelation;
    patient.nokAddress = req.body.patient.nokAddress;
    patient.nokContact = req.body.patient.nokContact;

    return patient.save(function(err, patient) {
        if(err) {
            console.log(err);
        }

        mysql.query(`CREATE TABLE IF NOT EXISTS ${patient._id} (
            ax float(3,2),
            ay float(3,2),
            az float(3,2),
            gx float(5,2),
            gy float(5,2),
            gz float(5,2),
            time double(20,8),
            date_uploaded date,
            dataset_name varchar(80)
        )`, function(err) {
            if(err) {
                console.log(err);
            }
        });

        return res.json({msg: "patient added"});
    }).catch(next);
})

router.route('/:patient_id')
.delete(function(req, res, next) {
    console.log(req.params);
    var patientIdToDelete = req.params.patient_id;

    Patient.deleteOne({ _id: patientIdToDelete }, function(err) {
        if(err) {
            console.log(err);
        }

        mysql.query(`DROP TABLE IF EXISTS ${patientIdToDelete}`, function(err) {
            if(err) {
                console.log(err);
            }
        });

        return res.json({msg: 'Deleted '+patientIdToDelete});
    })
});

router.route('/:patient_id/data')
.post(function(req,res,next) {
    console.log(req.params);
    var patientIdToUpdate = req.params.patient_id;
    var data = req.body.data.data;
    var gaitData = req.body.gaitData;

    console.log(data);

    Patient.updateOne({ _id: patientIdToUpdate },
        {
            $push: {"datasets": data}
        }, 
        function(err) {
            if(err) {
                console.log(err);
            }
            console.log('Patient data uploaded');
        }
    );

    //console.log(gaitData);

    gaitData.forEach(e => {
        mysql.query(`INSERT INTO ${patientIdToUpdate} VALUES
            ('${e[0]}', '${e[1]}','${e[2]}', '${e[3]}','${e[4]}', '${e[5]}','${e[6]}',  '${data['dateUploaded'].slice(0, 10)}', '${data['name']}')`)
    });

    console.log(mysql.query(`select count(*) from ${patientIdToUpdate}`, (err, res) => console.log(res)));
})

module.exports = router;