var database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.find({ 'place_id': id })
    .then((result) => {
      console.log('database data result', result)
      return result[0];
    });
};
