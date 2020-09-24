const { MongoClient } = require('mongodb');
const config = require('../config');

const mongoUrl = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}/${config.mongo.name}`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db(config.mongo.name);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error db', e);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
