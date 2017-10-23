const Message = require('./message.model');
const Chat = require('./chat.model');

module.exports = {
  getChatsGet: (req, res, next) => {
    const userId = req.params.id;

    Chat.find({ userId }).populate('spotId').exec()
    .then(chats => res.status(200).json(chats))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  getMessagesGet: (req, res, next) => {
    const chatId = req.params.id;

    Message.find().populate('author').exec()
    .then(messages => res.status(200).json(messages))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  createChatGet: (req, res, next) => {
    const userId = req.params.userId;
    const spotId = req.params.spotId;

    Chat.findOne({ userId, spotId }).exec()
    .then(chat => {
      if(chat)
        return res.status(400).json({ message: 'The chat already exists' });
      
      const newChat = new Chat({ userId, spotId });
      newChat.save()
      .then(chat => res.status(200).json(chat))
    })
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  },

  createMessPost: (req, res, next) => {
    const chatId = req.params.id;
    const { author, content } = req.body;

    const newMessage = new Message({ chatId, author, content });
    newMessage.save()
    .then(message => res.status(200).json(message))
    .catch(e => res.status(400).json({ message: 'Something went wrong' }));
  }
}