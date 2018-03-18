var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard();
var website = faker.internet.url();

module.exports = {
  result: {
    place_id: '1',
    name: randomName,
    formatted_address: "pier 1 1/2 The Embarcadero, San Francisco, CA 94105, USA",
    international_phone_number: "+1 415-397-8880",
    website: "http://jameshenryreynolds.com/",
    url: "https://maps.google.com/?cid=12288100453195726903: {
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
};





let names = [ 
  "Fairmont San Francisco",   
  "Le Méridien San Francisco",
  "La Mar Cebicheria Peruana",
  "Comstock Saloon",
  "Credo",
  "Local Kitchen & Wine Merchant",
  "54 Mint SF",
  "The Grove - Yerba Buena",
  "The Stinking Rose",
  "Benu",
  "Boulevard Restaurant",
  "Lers Ros",
  "Park Tavern",
  "Rogue Ales Public House",
  "Southern Pacific Brewing",
  "Perbacco",
  "Daily Grill",
  "Mission Bowling Club",
  "Jardinière",
  "One Market Restaurant",
  "Focaccia Market Bakery",
  "Extreme Pizza"
]