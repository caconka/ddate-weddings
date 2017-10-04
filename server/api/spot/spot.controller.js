const Spot = require('./spot.model');
const multer = require('multer')

module.exports = {
  signupPost: (req, res, next) => {
    // const { userId, spotName, location, places, services, guest,
    //         menuPrice } = req.body;
    
    // const photos = []
    // req.photos.forEach( elem => {
    //   const photo = {
    //     pic_path: `/uploads/${elem.filename}`,
    //     pic_name: elem.originalname
    //   }
    //   photos.push(photo) 
    // })
    
    const { userId, spotName } = req.body;
    
    Spot.findOne({ spotName }).exec()
    .then( spot => {
      if(spot)
        return res.status(400).json({ message: 'The spot already exists' });
      
      // const theSpot = new Spot({
      //   userId, spotName, location, photos,
      //   features: { places, services, guest }       
      // });
      const theSpot = new Spot({
        userId, spotName
      });

      theSpot.save()
      .then( spot => res.status(200).json(spot))
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  viewGet: (req, res, next) => {
    const spotId = req.params.id;

    Spot.findById(spotId).exec()
    .then( spot => {
      const visits = spot.visits + 1;
      Spot.findByIdAndUpdate(spotId, { $set: { visits }}, { new: true }).exec()
      .then( spot => res.status(200).json(spot))
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}
