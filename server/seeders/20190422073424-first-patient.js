"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("patients", [
      {
        name: "Furst Payshent",
        nric: "S2051646A",
        gender: "Male",
        dateOfBirth: new Date().toUTCString(),
        contact: "81234123",
        address: "123 Lonely Planet",
        zipCode: "123123",
        occupation: "Patient",
        maritalStatus: "Single",
        knownHealthIssues: "Bronchitis",
        nokName: "Sharecand Payshent",
        nokRelation: "Mother",
        nokAddress: "321 Lonely Color",
        nokContact: "83214321",
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("patients", [
      {
        name: "Furst Payshent"
      }
    ]);
  }
};
