require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const secretSession = process.env.SECRET_SESSION;

module.exports = app => {
  app.use(session({
    secret: secretSession,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

  require('./passport/serializers');
  require('./passport/local')
  app.use(passport.initialize());
  app.use(passport.session());
}