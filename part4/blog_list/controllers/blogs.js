const blogsRouter = require('express').Router();
const { ObjectId } = require('mongoose').Types;
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
    author: 1,
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
    author: body.author,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
    _id: 1,
    author: 1,
  });
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(populatedBlog);
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
  const { user, body } = request;

  const blog = await Blog.findById(request.params.id);
  if (!blog && (blog.user.toString() !== user.id)) {
    return response.status(403).json({
      error: 'no permission, not the owner',
    });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      ...body,
      user: ObjectId(body.user),
    },
    { new: true, runValidators: true, context: 'query' },
  ).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
    author: 1,
  });
  return response.json(updatedBlog);
});

module.exports = blogsRouter;
