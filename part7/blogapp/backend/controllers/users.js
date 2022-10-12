const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('express-async-errors');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response.status(401).json({
      error: 'invalid password',
    });
  }

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
  const users = await User.find({}).populate('blogs', {
    title: 1, url: 1, likes: 1, _id: 1, author: 1, comments: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
