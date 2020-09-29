const { ObjectID } = require('mongodb');

const connectDB = require('./db');

const errorHandler = require('./errorHandler');

module.exports = {
  getProducts: async (root, {storeID}) => {
    let db;
    let products = [];
    let store;

    if (storeID) {
      storeID = ObjectID(storeID);
      store = { store: storeID };
    }

    const query = {
      ...store,
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
  searchItems: async (root, { keyword }) => {
    let db
    let products
    let items
    try {
      db = await connectDB()
      products = await db.collection('Products').find(
        { $text: { $search: keyword }}
      ).toArray()
      items = [ ...products ]
    } catch (e) {
      errorHandler(e)
    }
    return items
  }
};
