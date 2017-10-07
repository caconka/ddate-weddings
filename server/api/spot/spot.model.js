const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
  spotName: String,
  location: { type: Number },
  dates: [{
    year: Number,
    month: Number,
    day: Number
  }],
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
      enum: ['Montaña', 'Ciudad', 'Playa', 'Campo']
    },
    place: {
      type: String,
      enum: ['Finca', 'Hotel', 'Restaurante', 'Convento', 'Castillo', 
            'Casa Rural', 'Bodega', 'Palacio', 'Otros']
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