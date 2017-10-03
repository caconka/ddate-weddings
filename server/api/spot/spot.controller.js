const passport = require('passport');
const bcrypt = require('bcrypt');
const Spot = require('./spot.model');
const multer = require('multer')

module.exports = {
  signupPost: (req, res, next) => {
    // const { userId, spotName, location, photos, places, services, guest,
    //         menuPrice } = req.body;

    // const theSpot = new Spot({
    //   userId, spotName, location, photos,
    //   features: { places, services, guest }       
    // });
    
    const { userId, spotName } = req.body;
    Spot.findOne({ spotName }).exec()
    .then(spot => {
      if(spot)
        return res.status(400).json({ message: 'The spot already exists' });
      
      const theSpot = new Spot({
        userId, spotName
      });

      theSpot.save()
      .then(spot => { res.status(200).json(spot) })
    })
    .catch(e => {
      res.status(400).json({ message: 'Something went wrong' })
    });
  },
}
