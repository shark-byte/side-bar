// var faker = require('faker');

// var randomName = faker.name.findName(); 
// var website = faker.internet.url();
// var address = faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA';
// var phoneNumber = faker.phone.phoneNumberFormat();
// var latitude = faker.address.latitude();
// var longitude = faker.address.longitude();



// let generateData = (id, randomName, address, phoneNumber, website, latitude, longitude) => {
//   let dataObj = {
//     result: {
//       place_id: id,
//       name: randomName,
//       formatted_address: "pier 1 1/2 The Embarcadero, San Francisco, CA 94105, USA",
//       international_phone_number: phoneNumber,
//       website: website,
//       url: "https://maps.google.com/?cid=12288100453195726903",
//       opening_hours: {
//         periods: [
//           {
//             close: {day: 2, time: "1930"},
//             open: {day: 2, time: "1130"}
//           }
//         ],
//         weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
//       },
//       geometry: {
//         location: {lat: 37.797387, lng: -122.395196}
//       }
//     }
//   };
//   return dataObj;
// };
// let data = [];

// let count = 0; 
// for (let j = 0; j < 2; j++) {
//   for (let i = 0; i < 10; i++) {
//     count++;
//     data.push(generateData(count, faker.name.findName(), faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ', ' + faker.address.zipCode() + 'USA', faker.phone.phoneNumberFormat(), faker.internet.url(), faker.address.latitude(), faker.address.longitude() ));
//   }
// }



// module.exports = data;




let data = {
  place_id: '2',
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
};

module.exports.data = data;