const User = require('./user.model');

module.exports = {
  editPost: (req, res, next) => {
    const { name, phone, email } = req.body;
    const userId = req.params.id;
    
    User.find({ email })
    .then( users => {
      let control = true;

      users.forEach( user => {
        if(user._id.toString() !== userId) {
          control = false;
          return res.status(400).json({ message: 'The email already exists' }); 
        }
      })

      if(control) {
        const updates = { name, phone, email }
  
        User.findByIdAndUpdate(userId, updates, { new: true }).exec()
        .then( user => res.status(200).json(user))
      }
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}