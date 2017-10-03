const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: Number,
  photo: {
    pic_path: String,
    pic_name: String
  },
  role: {
    type: String,
    enum: ['Admin', 'User', 'Client']
  }
});
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);