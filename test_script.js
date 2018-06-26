// lookup word from process.argv
let lookupWords = process.argv.slice(2);

// import package
const pg = require('pg');
const { user, password, database, host, port, ssl } = require('./settings.json');
const { addLikeOp, logResults } = require('./libs/query-helpers.js');

// create a new object called client
const client = new pg.Client({
  user,
  password,
  database,
  host,
  port,
  ssl
});

client.connect(err => {
  if (err) return console.error('Connection Error', err);
  const q = "SELECT * FROM famous_people WHERE first_name LIKE $1";
  // if you want to include %% around parameters, you must do it before passing the to the query
  client.query(q, addLikeOp(lookupWords), (err, result) => {
    if (err) return console.error('error running query', err);
    // log results
    logResults(lookupWords, result);
    client.end();
  });
});