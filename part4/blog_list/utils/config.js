require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV !== 'test'
  ? process.env.MONGODB_URI
  : process.env.TEST_MONGODB_URI;

const { PORT } = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
};
