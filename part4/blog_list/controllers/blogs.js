const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body, token } = request;

  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken.id) {
    return response.status(400).json({
      error: 'token missing or invalid token',
    });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    url: body.url,
    title: body.title,
    likes: body.likes,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);
  if (!blog) throw Error('NonExistingId');
  if (blog.user.toString() !== user.id) {
    return response.status(403).json({
      error: 'no permission, not the owner',
    });
  }

  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' },
  );
  response.json(blog);
});

module.exports = blogsRouter;
