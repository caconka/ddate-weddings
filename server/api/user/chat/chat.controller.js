const Message = require('./message.model');
const Chat = require('./chat.model');

module.exports = {
  getChatsGet: (req, res, next) => {
    const userId = req.params.userId;

    Chat.find({ userId }).populate('providerId').exec()
    .then(chats => res.status(200).json(chats))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  getMessagesGet: (req, res, next) => {
    const chatId = req.params.chatId;

    Message.find().populate('author').exec()
    .then(messages => res.status(200).json(messages))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  }
}