// import package
const knexfile = require('./knexfile');
// pass knexfile.development (knex configuration) to knex module
const knex = require('knex')(knexfile.development);

// import functions
const { checkRecord, showRecords, insertRecords } = require('./libs/knex-helpers');

// table
const table = 'famous_people';
// insert person
const person = {
  first_name: 'Harry',
  last_name: 'Kim',
  birthdate: new Date(1993, 12, 21)
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
