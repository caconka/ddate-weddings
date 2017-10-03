const User = require('./user.model');

module.exports = {
  editPost: (req, res, next) => {
    const { userId, name, phone, email } = req.body;
    
    User.find({ email })
    .then( users => {
      let control = true;

      users.forEach( user => {
        if(user._id.toString() !== userId)
          control = false;
      })

      if(control) {
        const updates = { name, phone, email }
  
        User.findByIdAndUpdate(userId, updates, { new: true }).exec()
        .then( user => res.status(200).json(user));

      } else {
        return res.status(400).json({ message: 'The email already exists' }); 
      }
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}