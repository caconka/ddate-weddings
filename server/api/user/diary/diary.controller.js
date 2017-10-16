const Diary = require('./diary.model');

module.exports = {
  createDiaryGet: (req, res, next) => {
    const userId = req.params.id;

    Diary.findOne({ userId }, '_id').exec()
    .then(diary => {
      if(diary)
        return res.status(400).json({ message: 'User has already a diary'})
        
      const theDiary = new Diary({ userId });
      return theDiary.save()
        .then(diary => { res.status(200).json(diary) })
    })    
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  getDiaryGet: (req, res, next) => {
    const userId = req.params.id;

    Diary.findOne({ userId }).exec()
    .then(diary => res.status(200).json(diary))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  }
}