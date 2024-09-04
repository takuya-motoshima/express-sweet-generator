import express from 'express'
import * as expressExtension from 'express-sweet';

// Creates and configures an ExpressJS web server.
const app = express();

// Mount the extension.
expressExtension.mount(app);

export default app;