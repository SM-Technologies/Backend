const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  api: {
    port: process.env.API_PORT || process.env.PORT,
  },
  mongo: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_NAME,
  },
};
