import express from 'express'
import * as expx from 'express-sweet';

// Creates and configures an ExpressJS web server.
const app = express();

// Mount the extension.
expx.mount(app);

export default app;