const LocalStrategy = require('passport-local').Strategy;
const User = require('../../api/user/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.use(new LocalStrategy({ usernameField: 'email' },
  (username, password, next) => {
    User.findOne({ 'email': username })
    .then(user =>{
      if (!user)
        return next(null, false, { message: 'Incorrect email' });

      if (!bcrypt.compareSync(password, user.password))
        return next(null, false, { message: 'Incorrect password' });

      next(null, user);
    })
    .catch(e => next(e));
  }
));