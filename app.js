const express = require('express');
const routes = require('./routes/routes');
// This app will take in incoming HTTP requests
const app = express();

routes(app);

module.exports = app;