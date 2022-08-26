require('express-async-errors');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../utils/config');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const correctPassword = (password === null || user === null)
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(correctPassword)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  return response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.modelName,
    });
});

module.exports = loginRouter;
