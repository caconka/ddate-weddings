const mongoose = require('mongoose');
const dbURL = process.env.DBURL || 'mongodb://localhost/history-tta';

mongoose.connect(dbURL, { useMongoClient: true })
  .then( () => console.log('Connected to db!'));
