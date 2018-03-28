
const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8

var faker = require('faker');
var time = new Date().getTime();

let generateData = (id, randomName, address, phoneNumber, website) => {
  let dataObj = {
    place_id: id,
    name: randomName,
    formatted_address: address + ", San Francisco, CA 94105, USA",
    international_phone_number: phoneNumber,
    website: website,
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
  };
  return dataObj;
};

if (cluster.isMaster){
  console.log(`Master ${process.pid} is running`);
  const size = 10000000 / numCPUs; 
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ start: i*size, end: (i + 1)*size });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`Worker ${process.pid} started`);
}

// database = process.env.DATABASE_HOST || 'localhost';
function seedDB(){
  var currentCount = 0;
  MongoClient.connect('mongodb://database:27017/').then((client) => {
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');
    var count = parseInt(process.env.end) - parseInt(process.env.start);
    const size = 20000; 
    
    async function insertBulk(){
    let begin = currentCount*size + parseInt(process.env.start);
    let finish = (currentCount + 1)*size + parseInt(process.env.start);
    var ops = _.range(begin, finish).map((id) => {
      let dataObj = generateData(id, faker.name.findName(), faker.address.streetAddress(), faker.phone.phoneNumberFormat(), faker.internet.url());
      return { insertOne: dataObj };
    });

    await collection.bulkWrite(ops, { ordered: false }); 
    count -= size;
    if (count > 0){
      currentCount++;
      insertBulk();
    } else {
      console.log(`worker: ${process.pid} done in ${(new Date().getTime() - time) / 1000}'s ;)`);
      var totalCount = await collection.count();
      if (totalCount === 10000000) {
        console.log(`Creating indicies`);
        await collection.createIndex({place_id: 1}, {unique: true}).catch((err) => {
          console.error(err);
        });
      }
      client.close();
      process.exit();        
    }
  }

    insertBulk();
  }).catch((err) => {
    console.error(err);
  });
}