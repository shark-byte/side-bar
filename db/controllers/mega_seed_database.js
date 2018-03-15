var data = require('../../single_restaurant_data.js');
var database = require('../models/restaurant.js');

// let insert = (data) => {
//   database.insert(data)
//   .then((response) => {
//     database.mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to seed database');
//     console.error('Error Name:', err.name);
//     console.error('Error Message:', err.message);
//     database.mongoose.disconnect();
//   });
// }

// database.insert(data)
//   .then((response) => {
//     database.mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to seed database');
//     console.error('Error Name:', err.name);
//     console.error('Error Message:', err.message);
//     database.mongoose.disconnect();
//   });

var faker = require('faker');

var randomName = faker.name.findName(); 
var website = faker.internet.url();
var address = faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA';
var phoneNumber = faker.phone.phoneNumberFormat();
var latitude = faker.address.latitude();
var longitude = faker.address.longitude();


let generateData = (id, randomName, address, phoneNumber, website, latitude, longitude) => {
  let dataObj = {
    result: {
      place_id: id,
      name: randomName,
      formatted_address: "pier 1 1/2 The Embarcadero, San Francisco, CA 94105, USA",
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
    }
  };
  return dataObj;
};


var count = 0; 
// while(count < 10000) {
  
// for (let i = 0; i < 100; i++) {
//   let data = [];
//   for (let j = 0; j < 1000; j++) {
//     count++;
//     data.push(generateData(count, faker.name.findName(), faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA', faker.phone.phoneNumberFormat(), faker.internet.url(), faker.address.latitude(), faker.address.longitude() ));
//   }

//   database.insert(data)
//   .then((response) => {
//     database.mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to seed database');
//     console.error('Error Name:', err.name);
//     console.error('Error Message:', err.message);
//     database.mongoose.disconnect();
//   });
  
// }

// let innerSeedFunc = (data) => {

//   database.insert(data)
//   .then((response) => {
//     database.mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to seed database');
//     console.error('Error Name:', err.name);
//     console.error('Error Message:', err.message);
//     database.mongoose.disconnect();
//   });
// }

seedData = (num) => {
  if (num === 0) {
    return;
  }
  let data = [];
  for (let j = 0; j < 5; j++) {
    count++;
    data.push(generateData(count, faker.name.findName(), faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA', faker.phone.phoneNumberFormat(), faker.internet.url(), faker.address.latitude(), faker.address.longitude() ));
  }
  database.insert(data)
    .then((response) => {
      database.mongoose.disconnect();
    }).then(seedData(num - 1))
    .catch((err) => {
      console.error('Failed to seed database');
      console.error('Error Name:', err.name);
      console.error('Error Message:', err.message);
      database.mongoose.disconnect();
    });
};

seedData(3);



// var count = 0;

// let makeData = (num) => {
//   let data = [];
//   for (let j = 0; j < num; j++) {
//     count++;
//     data.push(generateData(count, faker.name.findName(), faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA', faker.phone.phoneNumberFormat(), faker.internet.url(), faker.address.latitude(), faker.address.longitude() ));
//   }
//   return data;
// };

// seedData = () => {
  
//   database.insert(makeData(100))
//     .then((response) => {
//       database.mongoose.disconnect();
//     })
//     .catch((err) => {
//       console.error('Failed to seed database');
//       console.error('Error Name:', err.name);
//       console.error('Error Message:', err.message);
//       database.mongoose.disconnect();
//     });
// };

// seedData(10);
