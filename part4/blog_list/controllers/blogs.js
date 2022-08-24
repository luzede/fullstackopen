const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id);
  if (!deleted) throw Error('NonExistingId');
  response.status(204).end();
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
