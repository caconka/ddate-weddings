const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotName: String,
  location: { type: Number },
  dates: [{ type: Date, required: true }],
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
    menuPrice: Number,
    style: {
      type: String,
      enum: ['Mountain', 'City', 'Beach', 'Countryside']
    }
  },
  menus: [{
    pic_path: String,
    pic_name: String
  }],
  visits: { type: Number, default: 0, required: true }
});
spotSchema.set('timestamps', true);

module.exports = mongoose.model('Spot', spotSchema)