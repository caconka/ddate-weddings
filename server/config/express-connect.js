const mongoose = require('mongoose');
const dbURL = process.env.DBURL || 'mongodb://localhost/wedding-spots';

mongoose.connect(dbURL, { useMongoClient: true })
  .then( () => console.log('Connected to db!'))
  .catch( e => console.log('Failed to connect!'));
