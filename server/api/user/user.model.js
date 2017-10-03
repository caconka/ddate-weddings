const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  phone: Number,
  role: {
    type: String,
    enum: ['Admin', 'User', 'Spot']
  }
});
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);