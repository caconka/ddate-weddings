const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema ({
  chatId: { type: Schema.Types.ObjectId, ref:'Chat', required: true },
  author: { type: Schema.Types.ObjectId, ref:'User', required: true },
  content: { type: String, required: true }
});
messageSchema.set('timestamps', true);

module.exports = mongoose.model('Message', messageSchema)