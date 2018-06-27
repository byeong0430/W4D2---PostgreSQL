// take inputs from commandline
// [first_name, last_name, birthdate]
const inputData = process.argv.slice(2);

// import functions
const { renderNames, convertStrToDate, allInputsValid, checkRecord, showRecords, insertRecords } = require('./libs/knex-helpers');

// import packages
const path = require("path");
const knexfile = require('./knexfile');

// pass knexfile.development (knex configuration) to knex module
const knex = require('knex')(knexfile.development);

// check if all three parameters are correct
if (!allInputsValid(path, inputData)) return;

const first_name = renderNames(inputData[0]);
const last_name = renderNames(inputData[1]);
const birthdate = convertStrToDate(inputData[2]);

// table
const table = 'famous_people';

// insert person
const person = {
  first_name,
  last_name,
  birthdate
};

checkRecord(knex, person, table)
  .then(
    // new record case
    () => insertRecords(knex, table, person)
      .then(
        // insert successful
        success => console.log(success),
        // insert failed
        fail => console.log(fail)
      ),
    // duplicate case
    err => showRecords(err))
  .then(() => knex.destroy());
