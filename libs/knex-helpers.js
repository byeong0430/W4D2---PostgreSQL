// 1. trim all white spaces around the name, 2. lowercap all letters, then 3. capitalise the first letter
const renderNames = name => name.trim().toLowerCase().replace(/^\w/i, char => char.toUpperCase());

const convertStrToDate = stringDay => {
  // split the string day to year, month, and day
  const splitDate = stringDay.split('-');
  // month index begins from 0
  splitDate[1] = splitDate[1] - 1;
  return new Date(...splitDate);
};

// check if argument length = 3
const checkInputLen = (path, input, length) => {
  if (input.length === length) {
    return true;
  } else {
    console.log('Please follow proper syntax:');
    console.log(`node ${path.basename(__filename)} <first_name> <last_name> <yyyy-mm-dd>`);
    return false;
  }
};

// check if the first and second inputs are names (as opposed to numbers)
const isNames = input => {
  if (isNaN(Number(input[0])) && isNaN(Number(input[1]))) {
    return true;
  } else {
    console.log('Incorrect names!');
    return false;
  }
};

const isValidDateFormat = day => {
  // check if the 3rd argument has a valid date form (yyyy-mm-dd)
  const dateReg = /\b\d{4}-\d{1,2}-\d{1,2}\b/;
  if (day.match(dateReg)) {
    return true;
  } else {
    console.log('Incorrect date!');
    return false;
  }
};

const isValidYear = year => year >= 1000;
const isValidMonth = month => month >= 0;
const isValidDay = day => day > 0;
const isValidDateItems = dayArr => {
  if (isValidYear(dayArr[0]) && isValidMonth(dayArr[1]) && isValidDay(dayArr[2])) {
    return true;
  } else {
    console.log('Incorrect date!');
    return false;
  }
};

const allInputsValid = (path, input) => {
  // check if the argument length is 3
  if (!checkInputLen(path, input, 3)) return false;

  // check each date item is valid!
  const splitDate = input[2].split('-');
  // month index begins from 0
  splitDate[1] = splitDate[1] - 1;

  const isAllTrue = checkInputLen(path, input, 3) && isNames(input) &&
    isValidDateFormat(input[2]) && isValidDateItems(splitDate) &&
    isValidDateItems(splitDate);

  if (isAllTrue) {
    return true;
  } else {
    return false;
  }
};

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

// when there is a duplicate, alert the duplicate info
const showRecords = obj => {
  console.log(obj.message);
  console.log('==========');
  console.log(obj.record);
};

// insert record when there is no duplicate
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
  renderNames,
  convertStrToDate,
  allInputsValid,
  checkRecord,
  showRecords,
  insertRecords
};