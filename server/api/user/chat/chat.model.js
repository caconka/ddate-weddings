const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema ({
  providerId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  title: String
});
chatSchema.set('timestamps', true);

module.exports = mongoose.model('Chat', chatSchema)