const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // 8

var faker = require('faker');

var time = new Date().getTime();

const dbAddress = process.env.DB_ADDRESS || 'localhost';
const dbName = process.env.DB_NAME || 'wegot-sidebar';
const collectionName = process.env.COLLECTION_NAME || 'restaurants';
const seedNum = parseInt(process.env.SEED_NUM, 10) || 10;
const batchSize = parseInt(process.env.SEED_BATCH_SIZE, 10) || 5000;

const url = `mongodb://${dbAddress}:27017`;

// var count = parseInt(100000 / numCPUs);
//     const size = 20000;

// var obj = {
//   result: {
//     place_id: null,
//     name: faker.name.findName(),
//     formatted_address: faker.address.streetAddress() + ", San Francisco, CA 94105, USA",
//     international_phone_number: faker.phone.phoneNumberFormat(),
//     website: faker.internet.url(),
//     url: "https://maps.google.com/?cid=12288100453195726903",
//     opening_hours: {
//       periods: [
//         {
//           close: {day: 2, time: "1930"},
//           open: {day: 2, time: "1130"}
//         }
//       ],
//       weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
//     },
//     geometry: {
//       location: {lat: 37.797387, lng: -122.395196}
//     }
//   }
// };

// if (cluster.isMaster){
//   console.log(`Master ${process.pid} is running`);
//   const size = 12 / numCPUs; 
//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork({ start: i*size, end: (i + 1)*size });
//     // end - start / 20000
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} finished`);
//   });
// } else {
//   seedDB();
//   console.log(`Worker ${process.pid} started`);
// }


// function seedDB(){
//   var currentCount = 0;
//   MongoClient.connect('mongodb://localhost/').then((client) => {
//     const db = client.db('wegot-sidebar');
//     const collection = db.collection('restaurants');

//     var count = process.env.end - process.env.start;
//     const size = 2; 
//     // console.log('cprocess.env',  typeof (currentCount*size + process.env.start))
//     let begin = parseInt(currentCount*size + process.env.start);
//     let finish = parseInt((currentCount*size + 1) + process.env.start );
//     async function insertBulk(){
//       var ops = _.range(begin, finish).map((id) => {
//         console.log('the id bitch', id);
//         // obj.place_id = id; 
//         return { insertOne: {
//           result: {
//             place_id: id,
//             name: faker.name.findName(),
//             formatted_address: faker.address.streetAddress() + ", San Francisco, CA 94105, USA",
//             international_phone_number: faker.phone.phoneNumberFormat(),
//             website: faker.internet.url(),
//             url: "https://maps.google.com/?cid=12288100453195726903",
//             opening_hours: {
//               periods: [
//                 {
//                   close: {day: 2, time: "1930"},
//                   open: {day: 2, time: "1130"}
//                 }
//               ],
//               weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
//             },
//             geometry: {
//               location: {lat: 37.797387, lng: -122.395196}
//             }
//           }
//         } };
//       });

//       await collection.bulkWrite(ops, { ordered: false }); 
//       count -= size;
//       if (count > 0){
//         currentCount++;
//         insertBulk();
//       } else {
//         console.log('done in ', (new Date().getTime() - time) / 1000, 's ;)');
//         client.close();
//         process.exit();        
//       }
//     }

//     insertBulk();
//   }).catch((err) => {
//     console.error(err);
//   });
// }



const seedBatch = (minId, maxId, collection) => {
  new Promise(async (resolve, reject) => {
    const docs = [];
    for (let i = minId; i < maxId; i++) {
      docs.push(
        {
          result: {
            place_id: i,
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
        }
      );
    }
    try {
      const savedDocs = await collection.insertMany(docs);
      console.log(`successfully seeded ids ${minId}-${maxId}`);
      resolve(savedDocs);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
};

const seedDb = async (num, collection) => {
  try {
    for (let i = 0; i < num; i += batchSize) {
      await seedBatch(i, i + batchSize, collection);
    }
    console.log('done seeding db!');
  } catch (error) {
    console.error(error);
  }
};

MongoClient.connect(url)
  .then(async (client) => {
    const collection = client.db(dbName).collection(collectionName);
    await seedDb(seedNum, collection);
    client.close();
  })
  .catch((error) => {
    console.error(error);
  });

  