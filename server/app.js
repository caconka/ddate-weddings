const app = require('express')();

require('./config/express-connect');
require('./config/express-app')(app);
require('./config/session')(app);
require('./routes')(app);
app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
require('./config/error-handler')(app);

module.exports = app;
