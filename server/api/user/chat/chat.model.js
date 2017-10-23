const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotId: { type: Schema.Types.ObjectId, ref:'Spot', required: true }
});
chatSchema.set('timestamps', true);

module.exports = mongoose.model('Chat', chatSchema)