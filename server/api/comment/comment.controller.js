const Comnt = require('./comment.model');

module.exports = {
  createPost: (req, res, next) => {
    const { spotId, title, rating, text } = req.body;
    const userId = req.params.id;
    
    Comnt.findOne({ userId, spotId }, '_id').exec()
    .then( comment => {
      // if(comment)
      //   return res.status(400).json({ message: 'You have already make a comment' });
      
      const theComment = new Comnt({ userId, spotId, title, rating, text });

      return theComment.save()
      .then( comment => { res.status(200).json(comment) })
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  editPost: (req, res, next) => {
    const { rating, text } = req.body;
    const commentId = req.params.id;
    
    Comnt.findById( commentId ).exec()
    .then( comment => {
      const updates = { rating, text }

      Comnt.findByIdAndUpdate(commentId, updates, { new: true }).exec()
      .then( comment => res.status(200).json(comment));
    })
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  },

  listGet: (req, res, next) => {
    const spotId = req.params.id;

    Comnt.find({ spotId }).populate({ path: 'userId' }).exec()
    .then( comments => res.status(200).json(comments))
    .catch( e => res.status(400).json({ message: 'Something went wrong' }));
  }
}