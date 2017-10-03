const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotName: String,
  location: Point,
  photos: [{ 
    pic_path: String,
    pic_name: String
  }],
  features: {
    places: [ String ],
    services:[ String ],
    guest: {
      min: Number,
      max: Number
    },
    menuPrice: Number
  }
});
spotSchema.set('timestamps', true);

module.exports = mongoose.model('Spot', spotSchema)