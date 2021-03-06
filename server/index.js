const { MongoClient } = require('mongodb');
var express = require('express');
var app = express();

var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sidebarApp = require('./server-bundle.js');
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', async (req, res) => {
  const data = await recs(req);
  const component = ReactDOMServer.renderToString(React.createElement(sidebarApp.App, { data: data }));
  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <link rel="icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico" type="image/x-icon"> 
      </head>
      <body>
        <div id="sidebar-app">${component}</div>
        <script>
          window.initData = ${JSON.stringify(data)};
        </script>
        <script src="/bundle.js" type="text/javascript"></script>
      </body>
    </html>
  `;
  res.send(html);
});

async function queryDb(collection, id) {
  id = Number(id);
  const data = await collection.findOne({ place_id: id });
  return data;
  client.close();
}

// database = process.env.DATABASE_HOST || 'localhost';
async function recs (req) {
  try {
    const client = await MongoClient.connect('mongodb://database:27017/');
    const db = client.db('wegot-sidebar');
    const collection = db.collection('restaurants');
    const { id } = req.params;
    const data = await queryDb(collection, id);
    return data;
  }
  catch (error) {console.error(error)}
}
 

var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on ' + port); });
