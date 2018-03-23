// const MongoClient = require('mongodb').MongoClient;


// MongoClient.connect('mongodb://localhost/').then((client) => {
//   const db = client.db('wegot-sidebar');
//   var cursor = db.collection('restaurants').find({place_id: 3058780});
//   // const collection = db.collection('restaurants');
//   // let result = collection.find({place_id: 3058780})
//   console.log(cursor);;
// }).catch((err) => {
//   console.error(err);
// });

// var cursor = db.collection('inventory').find({});


const { MongoClient } = require('mongodb');
async function queryDb(collection, client) {
  const startTime = Date.now();
  for (let i = 1; i <= 1; i++) {
    const info = await collection.findOne({ place_id: Math.round(Math.random() * 10000000) });
    console.log(info);
  }
  console.log(`completed in: ${Date.now() - startTime} milliseconds\nwowwww....`);
  client.close();
}
MongoClient.connect('mongodb://localhost/', (err, client) => {
  if (err) {
    throw err;
  } else {
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');
    queryDb(collection, client).catch();
  }
});