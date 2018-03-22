var database = require('../models/restaurant.js');


function getTimes(num) {
  let time = 0; 
  randomIndexes = [];
  for (let i = 0; i < num; i++) {
    randomIndexes.push(Math.floor(Math.random() * 10000000));
  }
  for (let i = 0; i < num; i++) {
    // console.log(randomIndexes[i]);
    const start = new Date().getTime();
    database.find({ 'place_id': randomIndexes[i]})
    .then((result) => {
      // console.log('database data result', result)
      const end = new Date().getTime();
      // console.log('start', start);
      // console.log('end', end);
      // console.log(end - start);
      time += end - start;
      console.log(time, ' milliseconds');
    });
  }
  // let result = await times[0];
  // console.log(result);
  // setTimeout(()=>console.log(times),0);
}
getTimes(100);
// async function logTimes() {
//   let result = await getTimes();
//   console.log(times);
// };

// database.find({ 'place_id': 17 })
// .then((result) => {
//     const end = new Date().getTime();
//     console.log('database data result', result)
// });

