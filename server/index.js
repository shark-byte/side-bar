require('newrelic');
const { MongoClient } = require('mongodb');
var express = require('express');
var app = express();

var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});


app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.status(302).redirect('/restaurants/8');
});

app.use('/api/restaurants', restaurantsApiRouter);

async function queryDb(collection, id) {
  id = Number(id);
  const data = await collection.findOne({ place_id: id });
  return data;
}


  
MongoClient.connect('mongodb://localhost/', (err, client) => {
  if (err) {
    throw err;
  } else {
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');
    app.get('/api/restaurants/id:', async (req, res) => {
      const id = req.params.id;
      console.log('recieved query for id:', id);
      const data = await queryDb(collection, db, id).catch((err) => {
        console.error(err);
      });
      res.send(data);
    });
  }
  client.close();
});


var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
