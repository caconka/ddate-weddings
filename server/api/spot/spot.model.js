const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema ({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
spotSchema.set('timestamps', true);

module.exports = mongoose.model('Spot', spotSchema);