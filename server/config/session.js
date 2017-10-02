const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');

module.exports = app => {
  app.use(session({
    secret: 'probando unas cosas',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 24 * 60 * 60 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

  require('./passport/serializers');
  require('./passport/local')
  app.use(passport.initialize());
  app.use(passport.session());
}