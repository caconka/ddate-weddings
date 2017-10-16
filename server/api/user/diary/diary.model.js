const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  events: [{
    title: String,
    date: {
      year: Number,
      month: Number,
      day: Number
    },
    spotId: { type: Schema.Types.ObjectId, ref:'Spot', required: true }
  }],
});
diarySchema.set('timestamps', true);

module.exports = mongoose.model('Diary', diarySchema)