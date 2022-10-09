const jwt = require('jsonwebtoken');
const logger = require('./logger');
const config = require('./config');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.message === 'NonExistingId') {
    return response.status(400).json({
      error: error.message,
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
  return null;
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const { token } = request;
  if (!token) {
    next();
    return null;
  }
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(400).json({
      error: 'invalid token',
    });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({
      error: 'User associated with the token no longer exists',
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  request.user = user.toJSON();
  next();
  return null;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
