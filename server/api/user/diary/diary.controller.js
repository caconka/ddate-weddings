const Diary = require('./diary.model');

module.exports = {
  getDiaryGet: (req, res, next) => {
    const userId = req.params.id;

    Diary.findOne({ userId }).populate('spotId').exec()
    .then(diary => res.status(200).json(diary))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  addEventPost: (req, res, next) => {
    const userId = req.params.id;
    const { title, date, spotId, content } = req.body;
    let evnt;
    if(spotId !== '')
      evnt = { title, content, date, spotId };
    else
      evnt = { title, content, date };
    
    Diary.findOneAndUpdate({ userId }, { $push: { events: evnt }}, { new:true }).exec()
    .then(diary => res.status(200).json(diary))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  }
}