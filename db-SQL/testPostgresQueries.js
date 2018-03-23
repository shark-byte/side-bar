var query = require('pg-query');
query.connectionParameters = 'postgres://localhost:5432/wegot_sidebar';
 
//accepts optional array of values as 2nd parameter for parameterized queries 
var promise = query('SELECT * FROM restaurants WHERE place_id="5006";');
function onSuccess(rows, result) {
  console.log(rows);
  console.log(result);
}
function onError(error) {
  console.log(error);
}
promise.spread(onSuccess, onError);










// const path = require('path');
// const pathToCreateDB = './createDatabase.sql';
// const pg = require('pg');

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wegot_sidebar';

// // const client = new pg.Client(connectionString);
// // client.connect();
// // const query = client.query(
// // query.on('end', () => { client.end(); });


// const { Client } = require('pg')
// const client = new Client(connectionString);


// async function testQueries() {

//   await client.connect()

//   const res = await client.query('SELECT * FROM restaurants WHERE place_id="5006";')
//   console.log('its bed time', res);
//   // console.log(res.rows[0].message); // Hello world!
//   await client.end().catch((err) => {
//     console.error(err);
//   });
// }

// testQueries();