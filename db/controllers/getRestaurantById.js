var database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.find({ 'place_id': id })
    .then((result) => {
      console.log('database data result', result)
      return result[0];
    });
};



// const { MongoClient } = require('mongodb');

// async function queryDb(collection, client, id) {
//   // const startTime = Date.now();
//     return await collection.findOne({ place_id: id });
//     // console.log(info);
//   // return info;
//   // console.log(`completed in: ${Date.now() - startTime} milliseconds\nwowwww....`);
//   client.close();
// }

// module.exports = (id) => {
  
//   MongoClient.connect('mongodb://localhost/', (err, client) => {
//     if (err) {
//       throw err;
//     } else {
//       const db = client.db('wegot-sidebar');
//       const collection = db.collection('restaurants');
//       queryDb(collection, client, id).catch();
//     }
//   });
// }
// exports.queryDb = queryDb;