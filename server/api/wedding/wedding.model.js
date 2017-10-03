const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weddingSchema = new Schema ({
  userId: { type: Schema.Types.ObjectId, ref:'User' },
  guest: Number,
  styles: [{ 
    type: String,
    enum: [ 'Mountain', 'City', 'Beach', 'Countryside' ]
  }],
  dates: [ Date ],
  favoritSpots: [{ type: Schema.Types.ObjectId, ref:'Spot' }]
});
weddingSchema.set('timestamps', true);

module.exports = mongoose.model('Wedding', weddingSchema);