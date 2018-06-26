
// check if there is any duplicate data
const checkRecord = (knex, person, tb) => {
  return new Promise((resolve, reject) => {
    knex.where(person).select().table(tb)
      .then(row => {
        if (row.length) {
          // record exists. return an error message with the duplicate record
          reject({ message: "Your record already exists!", record: row });
        } else {
          // record doesn't exist. return null
          resolve(null);
        }
      })
  });
};

// when there is a duplicate, log the duplicate info
const showRecords = obj => {
  console.log(obj.message);
  console.log('==========');
  console.log(obj.record);
};

const insertRecords = (knex, tb, inputObj) => {
  return new Promise((resolve, reject) => {
    knex(tb).insert(inputObj)
      .then(result => {
        if (result.rowCount) {
          resolve('Record added!');
        } else {
          reject('Insert failed!')
        }
      });
  });
};

module.exports = {
  checkRecord,
  showRecords,
  insertRecords
};