const { ObjectID } = require('mongodb');

const connectDB = require('./db');
const errorHandler = require('./errorHandler');

module.exports = {
  Product: {
    store: async ({ store }) => {
      let db;
      let Data;
      try {
        db = await connectDB();
        Data = await db.collection('Stores').findOne({ _id: ObjectID(store) });
      } catch (e) {
        errorHandler(e);
      }

      return Data;
    }
  },
};
