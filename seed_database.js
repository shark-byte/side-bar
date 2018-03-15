// var data = require('./restaurants_data.js');
var dataObj = require('./single_restaurant_data.js');
var database = require('./db/models/restaurant.js');



let count = 0;
for (let i = 0; i < 10; i++) {
  let currentData = [];
  for (let j = 0; j < 10; j++) {
    count++;
    dataObj.data.place_id = count;
    currentData.push(dataObj.data);
  }
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


