const User = require('./user.model');

module.exports = {
  editPost: (req, res, next) => {
    const { userId, name, phone, email } = req.body;
    
    User.find({ email })
    .then( users => {
      users.forEach( user => {
        if(user._id.toString() !== userId)
          return res.status(400).json({ message: 'The email already exists' }); 
      })
      const updates = { name, phone, email }

      User.findByIdAndUpdate(userId, updates, { new: true }).exec()
      .then( user => { 
        res.status(200).json(user) })
    })
    .catch( e => {
      res.status(400).json({ message: 'Something went wrong' })
    });
  }
}