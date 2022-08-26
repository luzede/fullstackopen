/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');
const Blog = require('../models/blog');
const User = require('../models/user');

const testData = (async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const password = 'together';
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: 'elly',
    name: 'Elleonora',
    passwordHash,
  });
  const user = await newUser.save();

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    config.SECRET,
  );

  return {
    testUser: user,
    testToken: token,
  };
})();

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: 'Adventure', author: 'Luka', url: 'adventure.com', likes: 0, user: (await testData).testUser._id,
  });

  await blog.save();
  await blog.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

// USER SECTION
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  blogsInDb,
  nonExistingBlogId,
  usersInDb,
  testData,
};
