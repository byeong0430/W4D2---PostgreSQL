// add % around each parameter for 'like' operator in your query
const addLikeOp = wordArr => wordArr.map(word => `%${word}%`);

// get date part from Date Object
const formatBirthday = dateObj => dateObj.toISOString().split('T')[0];

// log results
const logResults = (words, queryResults) =>{
  words.forEach(word => {
    console.log('Searching ...');
    console.log(`Found ${queryResults.rowCount} person(s) by the name ${word.replace(/%/g, '')}:`);
    queryResults.rows.forEach((val, index) => {
      const {first_name, last_name, birthdate} = val;
      console.log(`- ${index + 1}: ${first_name} ${last_name}, born '${formatBirthday(birthdate)}'`);
    });
  });
};

module.exports = {
  addLikeOp,
  logResults
};