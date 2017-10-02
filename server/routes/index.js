var path = require('path');

module.exports = function(app) {
  app.use('/api/auth', require('../api/auth'));

  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};