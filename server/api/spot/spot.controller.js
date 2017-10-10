const _ = require('lodash');
const Spot = require('./spot.model');
const multer = require('multer');

module.exports = {
  signupPost: (req, res, next) => {
    // const { userId, spotName, location, places, services, guest,
    //         menuPrice } = req.body;
    
    const { userId, spotName, dates, photos, lat, lng } = req.body;
    
    Spot.findOne({ spotName }).exec()
    .then(spot => {
      if(spot)
      return res.status(400).json({ message: 'The spot already exists' });
      
      // const photos = spot.photos.push(`/uploads/${req.files[0].filename}`)
      // const theSpot = new Spot({
      //   userId, spotName, location, photos,
      //   features: { places, services, guest }       
      // });
      const theSpot = new Spot({ userId, spotName, dates, photos,
        location: { lat, lng }
      });

      theSpot.save()
      .then(spot => res.status(200).json(spot))
    })
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  viewGet: (req, res, next) => {
    const spotId = req.params.id;

    Spot.findById(spotId).exec()
    .then(spot => {
      const visits = spot.visits + 1;
      Spot.findByIdAndUpdate(spotId, { $set: { visits }}, { new: true }).exec()
      .then(spot => res.status(200).json(spot))
    })
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  listGet: (req, res, next) => {
    Spot.find().exec()
    .then(spots => res.status(200).json( _.shuffle(spots) ))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  listVisitGet: (req, res, next) => {
    Spot.find().exec()
    .then(spots => {
      const spotsSorted = spots.sort((a,b) => b.visits - a.visits).slice(0,10);
      return res.status(200).json(spotsSorted);
    })
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  }

}
