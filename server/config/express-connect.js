const mongoose = require('mongoose');
require('dotenv').load();
const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL, { useMongoClient: true })
  .then( () => console.log('Connected to db!'))
  .catch( e => console.log('Failed to connect!'));
