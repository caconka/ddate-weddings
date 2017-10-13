const app = require('express')();

require('./config/express-connect');
require('./config/express-app')(app);
require('./config/session')(app);
require('./routes')(app);
require('./config/error-handler')(app);

module.exports = app;
