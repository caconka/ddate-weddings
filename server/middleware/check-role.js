module.exports = {
  isAdmin: (req, res, next) => {
    if(req.user.role != 'Admin')
      return res.status(400).json({ message: 'Unautorized' });
    
    next();
  },

  isUser: (req, res, next) => {
    if(req.user.role != 'User')
      return res.status(400).json({ message: 'Unautorized' });
    
    next();
  },

  isProvider: (req, res, next) => {
    if(req.user.role != 'Provider')
      return res.status(400).json({ message: 'Unautorized' });
    
    next();
  }
}