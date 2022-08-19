// const mongoose = require('mongoose');
// const Blog = require('../models/blog');
// const config = require('../utils/config');

// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     console.log('connected to MongoDB');
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message);
//   });

// const blogs = await Blog.find({})
//   .then((b) => b)
//   .catch((error) => console.log(error));

const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
