const Wedding = require('./wedding.model');

module.exports = {
  addFavoritPost: (req, res, next) => {
    const { spotId } = req.body;
    const userId = req.params.id;
    
    Wedding.findOne({ userId }, '_id').exec()
    .then( wedding => {
      if(wedding) {
        Wedding.findByIdAndUpdate( wedding._id, 
          { $push: { favoritSpots: spotId }}, { new:true }).exec()
        .then( wedding => res.status(200).json(wedding))
      }
      
      const theWedding = new Wedding({ userId, favoritSpots: [ spotId ] });

      return theWedding.save()
      .then( wedding => { res.status(200).json(wedding) })
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  editPost: (req, res, next) => {
    const { guest, styles, dates } = req.body;
    const userId = req.params.id;
    
    Wedding.findOne({ userId }, '_id').exec()
    .then( wedding => {
      const updates = { guest, styles, dates }

      Wedding.findByIdAndUpdate(wedding._id, updates, { new: true }).exec()
      .then( wedding => res.status(200).json(wedding));
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  deleteFavoritPost: (req, res, next) => {
    const userId = req.params.id;

    Wedding.findOne({ userId }, '_id').exec()
    .then( wedding => {

    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}