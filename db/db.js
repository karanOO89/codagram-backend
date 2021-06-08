
const pg = require('pg');
const Client = pg.Client;

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

const client = new Client(dbParams);

client.connect(() => {
  console.log('connected to database');
});
}

module.exports = dbParams;

