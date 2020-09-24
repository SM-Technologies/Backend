const { ObjectID } = require('mongodb');

const connectDB = require('./db');

const errorHandler = require('./errorHandler');

module.exports = {
  getProducts: async (root, { countryID, storeID, cathegoryID }) => {
    let db;
    let products = [];
    let country; let store; let cathegory;

    if (countryID) {
      countryID = ObjectID(countryID);
      country = { country: countryID };
    }
    if (cathegoryID) {
      cathegoryID = ObjectID(cathegoryID);
      cathegory = { cathegory: cathegoryID };
    }
    if (storeID) {
      storeID = ObjectID(storeID);
      store = { store: storeID };
    }

    const query = {
      ...country,
      ...store,
      ...cathegory,
    };

    try {
      db = await connectDB();
      products = await db.collection('Products').find(query).toArray();
    } catch (e) {
      errorHandler(e);
    }
    return products;
  },
  getProduct: async (root, { id }) => {
    let db;
    let product;
    try {
      db = await connectDB();
      product = await db.collection('Products').findOne({ _id: ObjectID(id) });
    } catch (e) {
      errorHandler(e);
    }
    return product;
  },
  getStores: async () => {
    let db;
    let Stores = [];
    try {
      db = await connectDB();
      Stores = await db.collection('Stores').find().toArray();
    } catch (e) {
      errorHandler(e);
    }
    return Stores;
  },
  getStore: async (root, { id }) => {
    let db;
    let Store;
    try {
      db = await connectDB();
      Store = await db.collection('Stores').findOne({ _id: ObjectID(id) });
    } catch (e) {
      errorHandler(e);
    }
    return Store;
  },
  getCathegorys: async () => {
    let db;
    let Cathegorys = [];
    try {
      db = await connectDB();
      Cathegorys = await db.collection('Cathegorys').find().toArray();
    } catch (e) {
      errorHandler(e);
    }
    return Cathegorys;
  },
  getCathegory: async (root, { id }) => {
    let db;
    let Cathegory;
    try {
      db = await connectDB();
      Cathegory = await db
        .collection('Cathegorys')
        .findOne({ _id: ObjectID(id) });
    } catch (e) {
      errorHandler(e);
    }
    return Cathegory;
  },
};
