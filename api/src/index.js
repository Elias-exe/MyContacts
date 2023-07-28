const express = require('express');
const dotenv = require('dotenv');
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(3001, () => console.log(`🌹 Server started at http://localhost:${port}`));
