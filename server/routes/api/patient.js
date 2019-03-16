var router = require("express").Router();
var mongoose = require("mongoose");
var mysql = require("../../db/mysqldb");
var Patient = mongoose.model("Patient");

router.get("/all", function(req, res, next) {
  Patient.find({}, function(err, patients) {
    console.log("Sending patient data to : " + req.ip);
    return res.json({ data: patients });
  });
});

//TODO: append user_id after accounts implemented
router.route("/").post(function(req, res, next) {
  console.log("receiving incoming patient data");
  console.log(req.body);
  const patient = new Patient(req.body.patient);

  return patient
    .save(function(err, patient) {
      if (err) {
        console.log(err);
      }

      mysql.query(
        `CREATE TABLE IF NOT EXISTS ${patient._id} (
            ax float(3,2),
            ay float(3,2),
            az float(3,2),
            gx float(5,2),
            gy float(5,2),
            gz float(5,2),
            time double(20,8),
            date_uploaded date,
            dataset_name varchar(80)
        )`,
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );

      return res.json({ msg: "patient added" });
    })
    .catch(next);
});

router.route("/:patient_id").delete(function(req, res, next) {
  console.log(req.params);
  var patientIdToDelete = req.params.patient_id;

  Patient.deleteOne({ _id: patientIdToDelete }, function(err) {
    if (err) {
      console.log(err);
    }

    mysql.query(`DROP TABLE IF EXISTS ${patientIdToDelete}`, function(err) {
      if (err) {
        console.log(err);
      }
    });

    return res.json({ msg: "Deleted " + patientIdToDelete });
  });
});

router.route("/:patient_id/data").post(function(req, res, next) {
  console.log(req.params);
  var patientIdToUpdate = req.params.patient_id;
  var data = req.body.data.data;
  var gaitData = req.body.gaitData;

  console.log(data);

  Patient.updateOne(
    { _id: patientIdToUpdate },
    {
      $push: { datasets: data }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
      console.log("Patient data uploaded");
    }
  );

  //console.log(gaitData);

  gaitData.forEach(e => {
    mysql.query(`INSERT INTO ${patientIdToUpdate} VALUES
            ('${e[0]}', '${e[1]}','${e[2]}', '${e[3]}','${e[4]}', '${e[5]}','${
      e[6]
    }',  '${data["dateUploaded"].slice(0, 10)}', '${data["name"]}')`);
  });

  console.log(
    mysql.query(`select count(*) from ${patientIdToUpdate}`, (err, res) =>
      console.log(res)
    )
  );
});

module.exports = router;
