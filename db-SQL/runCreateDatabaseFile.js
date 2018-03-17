// const path = require('path');
// const pathToCreateDB = './createDatabase.sql';
// const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wegot_sidebar';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
// query.on('end', () => { client.end(); });


const { Client } = require('pg')
const client = new Client(connectionString);


async function createTable() {

    await client.connect()

    const res = await client.query('CREATE TABLE restaurants(place_id SERIAL UNIQUE PRIMARY KEY, restaurant_name VARCHAR(60) NOT NULL, formatted_address VARCHAR(120) NOT NULL, international_phone_number VARCHAR(20) NOT NULL, website VARCHAR(120) NOT NULL, google_map_url VARCHAR(120) NOT NULL, open_now JSON NOT NULL, longitude NUMERIC (3, 7), latitude NUMERIC (5, 7)')
    console.log('its bed time')
    // console.log(res.rows[0].message); // Hello world!
    await client.end()
}

createTable();




// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wegot_sidebar';
// // const client = new pg.Client(connectionString);
// // client.connect();
// // const query = client.query('CREATE TABLE restaruants(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// // query.on('end', () => { client.end(); });
// const { Client } = require('pg')
// const client = new Client(connectionString)
// async function myDB () {
//     await client.connect();
    
//     const res = await client.query('CREATE TABLE restaruants(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')
//     console.log('okok') // Hello world!
//     await client.end()
    
// }
// myDB();
