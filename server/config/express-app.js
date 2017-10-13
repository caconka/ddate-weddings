const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rootPath = require('path').normalize(__dirname + '/../');
const cors = require('cors');

const whitelist = ['http://localhost:4200'];
const corsOptions = {
  origin: function(origin, callback) {
      const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};

module.exports = app => {
  app.use(cors(corsOptions));
  app.set('views', rootPath + 'views');
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(rootPath + 'public'));
}