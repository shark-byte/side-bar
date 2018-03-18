const pgp = require('pg-promise')({
    capSQL: true // generate capitalized SQL 
});

const db = pgp('postgres://localhost:5432/wegot_sidebar'); // your database object

var faker = require('faker');

let generateData = (randomName, address, phoneNumber, website, latitude, longitude) => {
  let dataObj = {
    restaurant_name: randomName,
    formatted_address: address + ", San Francisco, CA 94105, USA",
    international_phone_number: phoneNumber,
    website: website,
    google_map_url: "https://maps.google.com/?cid=12288100453195726903",
    open_now: JSON.stringify ({
      periods: [
        {
          close: {day: 0, time: "1930"},
          open: {day: 0, time: "1130"}
        },
        {
          close: {day: 1, time: "1930"},
          open: {day: 1, time: "1130"}
        },
        {
          close: {day: 2, time: "1930"},
          open: {day: 2, time: "1130"}
        },
        {
          close: {day: 3, time: "1930"},
          open: {day: 3, time: "1130"}
        },
        {
          close: {day: 4, time: "1930"},
          open: {day: 4, time: "1130"}
        },
        {
          close: {day: 6, time: "1930"},
          open: {day: 6, time: "1130"}
        },
        {
          close: {day: 7, time: "1930"},
          open: {day: 7, time: "1130"}
        },
      ],
      weekday_text: ["Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM"]
    }),
    latitude: 37.797387, 
    longitude: -122.395196
  };
  return dataObj;
};


// Creating a reusable/static ColumnSet for generating INSERT queries:    
const cs = new pgp.helpers.ColumnSet([
    'restaurant_name',
    'formatted_address',
    'international_phone_number',
    'website',
    'google_map_url',
    'open_now',
    'longitude',
    'latitude',
], {table: 'restaurants'});

db.tx('massive-insert', t => {
  return t.sequence(index => {
    return getNextData(t, index)
      .then(data => {
          if (data) {
              const insert = pgp.helpers.insert(data, cs);
              return t.none(insert);
          }
      });
  });
})
    .then(data => {
        // COMMIT has been executed
        console.log('Total batches:', data.total, ', Duration:', data.duration);
    })
    .catch(error => {
        // ROLLBACK has been executed
        console.log(error);
    });

function getNextData(t, pageIndex) {
    let data = null;
    if (pageIndex < 100000) {
        data = [];
        for (let i = 0; i < 100; i++) {
            let dataObj = generateData(faker.name.findName(), faker.address.streetAddress(), faker.phone.phoneNumberFormat(), faker.internet.url() );
            data.push(dataObj);
        }
    }
    return Promise.resolve(data);
}