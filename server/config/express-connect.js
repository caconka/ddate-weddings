require('dotenv').config();
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL, { useMongoClient: true })
  .then(() => console.log('Connected to db!'))
  .catch(e => console.log('Failed to connect!'));
