const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotId: { type: Schema.Types.ObjectId, ref:'Spot', required: true },
  comment: String,
  rating: Number
});
commentSchema.set('timestamps', true);

module.exports = mongoose.model('Spot', commentSchema);