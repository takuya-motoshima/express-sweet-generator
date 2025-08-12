const express = require('express');
const expx = require('express-sweet');

// Creates and configures an ExpressJS web server.
const app = express();

// Mount the extension.
expx.mount(app);

module.exports = app;