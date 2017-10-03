const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotId: { type: Schema.Types.ObjectId, ref:'Spot', required: true },
  text: String,
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 5
  }
});
commentSchema.set('timestamps', true);

module.exports = mongoose.model('Comment', commentSchema);