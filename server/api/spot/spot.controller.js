const _ = require('lodash');
const Spot = require('./spot.model');
const calculate = require('azimuth');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  signupPost: (req, res, next) => {
    const { userId, spotName, dates, photos, lat, lng, guest, menuPrice, style, 
            place, places, services, description } = req.body;
    
    Spot.findOne({ spotName }).exec()
    .then(spot => {
      if(spot)
        return res.status(400).json({ message: 'The spot already exists' });
      
      const theSpot = new Spot({ userId, spotName, dates, photos, description,
        location: { lat, lng },
        features: { places, services, guest, menuPrice, style, place }
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
  },

  getListByLocationPost: (req, res, next) => {
    const { lat, lng, dist } = req.body;
    const searchLocation = { lat, lng, elv: 0 };
    const listByLocation = [];

    Spot.find().exec()
    .then(spots => {
      spots.forEach(spot => {
        const spotLocation = {
          lat: spot.location.lat,
          lng: spot.location.lng,
          elv: 0
        }

        const distance = calculate.azimuth(searchLocation, spotLocation)
        if(parseInt(distance.distance) <= dist) 
          listByLocation.push(spot);
      })

      return res.status(200).json(listByLocation);
    })
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  dropGet: (req, res, next) => {
    const spotId = req.params.id;
    Spot.findByIdAndRemove(spotId).exec()
    .then(spot => res.status(200).json(spot))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  sendEmailPost: (req, res, next) => {
    const spotId = req.params.id;
    Spot.findById(spotId).populate('userId').exec()
    .then(spot => {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.PATH_USER,
          pass: process.env.PATH_PASS
        }
      });
      const mailOptions = {
        from: process.env.PATH_USER,
        to: process.env.PATH_SEND,
        subject: `Solicitud para ${spot.spotName}`,
        html: req.body.text
      };

      transporter.sendMail(mailOptions).exec()
      .then(info => {
        console.log('Message sent: ' + info.response);
        res.status(200).json(alerts);
      })
      .catch(e => res.status(400).json({ message: 'Something went wrong' }));
    })
  }

}
