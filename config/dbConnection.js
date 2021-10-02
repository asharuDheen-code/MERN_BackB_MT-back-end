const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const URL = process.env.MONGO_URI;

let state = {
  db: null,
};

module.exports.connect = () => {
  const dbName = "backb";

  mongoClient.connect(
    URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err, data) => {
      if (err) throw err;
      state.db = data.db(dbName);
    }
  );
};

module.exports.get = () => state.db;
