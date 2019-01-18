var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    name: String,
    nric: String,
    gender: String, 
    dateOfBirth: Date,
    contact: String,
    address: String, 
    zipCode: String,
    occupation: String,
    maritalStatus: String,
    knownHealthIssues: String,
    nokName: String,
    nokRelation: String,
    nokAddress: String,
    nokContact: String,
}, {timestamps: true});

PatientSchema.methods.toJSONFor = function(patient){
  return {
    _id: this._id,
    name: this.name,
    nric: this.nric,
    gender: this.gender, 
    dateOfBirth: this.dateOfBirth,
    contact: this.contact,
    address: this.address, 
    zipCode: this.zipCode,
    occupation: this.occupation,
    maritalStatus: this.maritalStatus,
    knownHealthIssues: this.knownHealthIssues,
    nokName: this.nokName,
    nokRelation: this.nokRelation,
    nokAddress: this.nokAddress,
    nokContact: this.nokContact
  };
};

mongoose.model('Patient', PatientSchema);