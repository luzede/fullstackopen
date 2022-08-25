const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('express-async-errors');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return response.status(400).json({
      error: 'a person with this username already exists',
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
