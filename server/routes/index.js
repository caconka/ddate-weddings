const path = require('path');

module.exports = function(app) {
  app.use('/api/auth', require('../api/user/auth'));
  app.use('/api/user', require('../api/user'));
  app.use('/api/spot', require('../api/spot'));
  app.use('/api/wedding', require('../api/wedding'));
  app.use('/api/comment', require('../api/comment'));
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/../public/index.html');
  });
};