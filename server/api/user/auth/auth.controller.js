const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../user.model');

module.exports = {
  signupPost: (req, res, next) => {
    const { email, password, name, role } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Provide email and password' });

    User.findOne({ email }, '_id').exec()
    .then(user => {
      if(user)
        return res.status(400).json({ message: 'The email already exists' });

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const theUser = new User({
        email, name, role,
        password: hashPass
      });

      return theUser.save()
      .then(user => {
        req.login(user, (err) => {
          if(err)
            return res.status(500).json({ message: 'Something went wrong' });

          res.status(200).json(req.user);
        });
      })
    })
    .catch(e => {
      res.status(400).json({ message: 'Something went wrong' })
    });
  },

  loginPost: (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
      if (err)
        return res.status(500).json({ message: 'Something went wrong' });

      if (!user)
        return res.status(401).json(failureDetails);

      req.login(user, (err) => {
        if (err)
          return res.status(500).json({ message: 'Something went wrong' });

        res.status(200).json(req.user);
      });
    })(req, res, next);
  },

  logoutGet: (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
  },

  loggedin: (req, res, next) => {
    if (req.isAuthenticated())
      return res.status(200).json(req.user);
    res.status(403).json({ message: 'Unauthorized' });
  }
}
