const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var database = require('./db/models/restaurant.js');
const _ = require('ramda');
var faker = require('faker');
var time = new Date().getTime();


makeObj = (id) => {
    let data = {
      result: {
        place_id: id,
        name: 'Reynolds Pub',
        formatted_address: "pier 1 1/2 The Embarcadero, San Francisco, CA 94105, USA",
        international_phone_number: "+1 415-397-8880",
        website: "http://jameshenryreynolds.com/",
        url: "https://maps.google.com/?cid=12288100453195726903",
        opening_hours: {
          open_now: true,
          periods: [
            {
              close: {day: 0, time: "2130"},
              open: {day: 0, time: "1130"}
            }
          ],
          weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
        },
        geometry: {
          location: {lat: 37.797387, lng: -122.395196}
        }
      }
    }
    return data;
  }
   
  if (cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    const size = 10000 / numCPUs; 
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({ start: i*size, end: (i + 1)*size });
      // end - start / 20000
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} finished`);
    });
  } else {
    seedDB();
    console.log(`Worker ${process.pid} started`);
  }


  function seedDB() {
    var count = parseInt(10000000 / numCPUs);
    const size = 20000; 

    async function insertBulk(){
      var ops = _.range(0, size).map((id) => {
        return { insertOne: { "document": {...obj, rid: id*Math.random() } }};
      });

      await collection.insertMany(ops, { ordered: false }); 
      count -= size;
      if (count > 0){
        insertBulk();
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
        client.close();
        process.exit();        
      }
    }

    insertBulk();
  };
  
// var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
// Movies.insertMany(arr, function(error, docs) {});