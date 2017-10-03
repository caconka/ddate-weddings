const Comnt = require('./comment.model');

module.exports = {
  createPost: (req, res, next) => {
    const { userId, spotId, rating, text } = req.body;
    
    Comnt.findOne({ userId, spotId }, '_id').exec()
    .then( comment => {
      if(comment)
        return res.status(400).json({ message: 'You have already make a comment' });
      
      const theComment = new Comnt({ userId, spotId, rating, text });

      theComment.save()
      .then( comment => { res.status(200).json(comment) })
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  editPost: (req, res, next) => {
    const { commentId, rating, text } = req.body;
    
    Comnt.findById( commentId ).exec()
    .then( comment => {
      const updates = { name, phone, email }

      User.findByIdAndUpdate(userId, updates, { new: true }).exec()
      .then( user => res.status(200).json(user));
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}