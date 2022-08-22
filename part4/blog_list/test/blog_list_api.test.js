const mongoose = require('mongoose');
const supertest = require('supertest');
// const config = require('../utils/config');
const helper = require('../utils/test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

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
  console.log(dbBlogs[0]);
  expect(dbBlogs[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
