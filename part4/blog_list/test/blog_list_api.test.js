const mongoose = require('mongoose');
const supertest = require('supertest');
require('express-async-errors');
const helper = require('../utils/test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('blog list api', () => {
  test('HTTP GET request works', async () => {
    api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('db size is correct', async () => {
    const response = await api.get('/api/blogs');
    const dbBlogs = response.body;
    expect(dbBlogs.length).toEqual(helper.initialBlogs.length);
  });

  test('"id" property is UUID', async () => {
    const response = await api.get('/api/blogs');
    const dbBlogs = response.body;
    expect(dbBlogs[0].id).toBeDefined();
  });

  test('HTTP POST works', async () => {
    const response = await api
      .post('/api/blogs')
      .send({
        author: 'au',
        likes: 0,
        title: 'au',
        url: 'au',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedBlogs = await helper.blogsInDb();
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    expect(response.body.author).toBe('au');
  });

  test('likes property missing from the request -> default to value 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send({
        author: 'au',
        title: 'au',
        url: 'au',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('title and url missing -> 400 status code', async () => {
    await api
      .post('/api/blogs')
      .send({ likes: 0, author: 'au' })
      .expect(400);
  });

  test('HTTP DELETE method works', async () => {
    const blogs = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204);

    const blogsAfter = await helper.blogsInDb();

    expect(blogsAfter.length).toBe(blogs.length - 1);
  });

  test('Deleting non-existing resource', async () => {
    const nonExistingId = await helper.nonExistingBlogId();

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(400);

    const blogsBefore = await helper.blogsInDb();
    const blogsAfter = await helper.blogsInDb();

    expect(blogsBefore.length).toEqual(blogsAfter.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
