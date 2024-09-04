const express = require('express');
const expressExtension = require('express-sweet');

// Creates and configures an ExpressJS web server.
const app = express();

// Mount the extension.
expressExtension.mount(app);

module.exports = app;