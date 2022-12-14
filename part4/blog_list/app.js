const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter,
);
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testingRouter');
  app.use('/api/testing', testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
