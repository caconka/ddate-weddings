const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: Number,
  avatar: String,
  role: {
    type: String,
    enum: [ 'Admin', 'User', 'Provider' ],
    default: 'User'
  }
});
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);