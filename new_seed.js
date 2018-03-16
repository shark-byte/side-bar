const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8

var faker = require('faker');

var time = new Date().getTime();

// var count = parseInt(100000 / numCPUs);
//     const size = 20000;

var obj = {
  result: {
    place_id: null,
    name: faker.name.findName(),
    formatted_address: faker.address.streetAddress() + ", San Francisco, CA 94105, USA",
    international_phone_number: faker.phone.phoneNumberFormat(),
    website: faker.internet.url(),
    url: "https://maps.google.com/?cid=12288100453195726903",
    opening_hours: {
      periods: [
        {
          close: {day: 2, time: "1930"},
          open: {day: 2, time: "1130"}
        }
      ],
      weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
    },
    geometry: {
      location: {lat: 37.797387, lng: -122.395196}
    }
  }
};

if (cluster.isMaster){
  console.log(`Master ${process.pid} is running`);
  const size = 100000 / numCPUs.length; 
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ workerId: i});
    // end - start / 20000
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}


function seedDB(){
  var currentCount = 0;
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');

    var count = process.env.end - process.env.start;
    const size = 20000; 
    console.log('currentCount*size + process.env.start', process.env.start)
    async function insertBulk(){
      var ops = _.range(currentCount*size + process.env.start, (currentCount*size + 1) + process.env.start).map((id) => {
        return { insertOne: { "document": {...obj, place_id:id } }};
      });

      await collection.bulkWrite(ops, { ordered: false }); 
      count -= size;
      if (count > 0){
        currentCount++;
        insertBulk();
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's ;)');
        client.close();
        process.exit();        
      }
    }

    insertBulk();
  });
}