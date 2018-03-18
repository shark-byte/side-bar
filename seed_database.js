// var data = require('./restaurants_data.js');
// var dataObj = require('./single_restaurant_data.js');
var database = require('./db/models/restaurant.js');

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
 

let count = 0;
for (let i = 0; i < 10; i++) {
  let currentData = [];
  for (let j = 0; j < 10; j++) {
    count++;
    let dataObj = makeObj(count);
    // dataObj.data.place_id = count;
    currentData.push(dataObj);
  }
  console.log(currentData)
  database.insert(currentData)
    .then((response) => {
      database.mongoose.disconnect();
    })
    .catch((err) => {
      console.error('Failed to seed database');
      console.error('Error Name:', err.name);
      console.error('Error Message:', err.message);
      database.mongoose.disconnect();
    });
}


