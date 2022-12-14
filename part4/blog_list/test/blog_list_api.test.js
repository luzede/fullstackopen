const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
require('express-async-errors');
const helper = require('../utils/test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

describe('tests for blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const { testUser } = await helper.testData;

    const blog = new Blog({
      title: 'I love you',
      author: 'Elly McLoving',
      url: 'love.com',
      likes: 0,
      // eslint-disable-next-line no-underscore-dangle
      user: testUser._id,
    });

    await blog.save();
    const user = await User.findOne({ username: 'elly' });
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
  });

  test('HTTP GET request works', async () => {
    api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('db size is correct', async () => {
    const response = await api.get('/api/blogs');
    const dbBlogs = response.body;
    expect(dbBlogs.length).toEqual(1);
  });

  test('"id" property is UUID', async () => {
    const response = await api.get('/api/blogs');
    const dbBlogs = response.body;
    expect(dbBlogs[0].id).toBeDefined();
  });

  test('HTTP POST works', async () => {
    const blogsBefore = await helper.blogsInDb();
    const { testToken } = await helper.testData;
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send({
        author: 'Elly McLoving',
        likes: 99,
        title: 'Love is in the air',
        url: 'lovely.com',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(blogsBefore.length + 1);

    expect(response.body.author).toBe('Elly McLoving');
  });

  test('likes property missing from the request -> default to value 0', async () => {
    const { testToken } = await helper.testData;
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send({
        author: 'Elly McLoving',
        title: 'Love is in the air',
        url: 'lovely.com',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('title and url missing -> 400 status code', async () => {
    const { testToken } = await helper.testData;
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send({ likes: 0, author: 'Elly McLoving' })
      .expect(400);
  });

  test('HTTP DELETE method works', async () => {
    const { testToken } = await helper.testData;
    const blogs = await helper.blogsInDb();
    await api
      .delete(`/api/blogs/${blogs[0].id}`) // Get method that fetches _id(ObjectID) value as string
      .set('Authorization', `bearer ${testToken}`)
      .expect(204);

    const blogsAfter = await helper.blogsInDb();

    expect(blogsAfter.length).toBe(blogs.length - 1);
  });

  test('Deleting non-existing resource', async () => {
    const { testToken } = await helper.testData;
    const nonExistingId = await helper.nonExistingBlogId();

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(400);

    const blogsBefore = await helper.blogsInDb();
    const blogsAfter = await helper.blogsInDb();

    expect(blogsBefore.length).toEqual(blogsAfter.length);
  });

  test('HTTP PUT updating a resource', async () => {
    const { testToken } = await helper.testData;
    const blogs = await helper.blogsInDb();
    const updatedBlog = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `bearer ${testToken}`)
      .send({
        author: 'ee',
        url: 'ee',
        title: 'ee',
        likes: 0,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    expect(JSON.stringify(blogsAfter[0])).toEqual(updatedBlog.text);

    expect(blogsAfter.length).toBe(blogs.length);
  });

  test('HTTP PUT updating non existent resource -> 400 Bad Request', async () => {
    const { testToken } = await helper.testData;
    await api
      .put('/api/blogs/123')
      .set('Authorization', `bearer ${testToken}`)
      .send({
        author: 'ee',
        url: 'ee',
        title: 'ee',
        likes: 0,
      })
      .expect(400);
  });

  test('Adding blog fails without token', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'ee',
        url: 'ee',
        title: 'ee',
        likes: 0,
      })
      .expect(401);
  });
});

describe('tests for users', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sexysecretary', 10);
    const user = new User({
      username: 'Elly',
      name: 'Elleonora',
      passwordHash,
    });

    await user.save();
  });

  test('HTTP POST a new user', async () => {
    const usersBefore = await helper.usersInDb();

    const newUser = {
      username: 'Luky',
      name: 'Luka',
      password: 'ellyluky',
    };

    const user = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(user.body.username).toBe(newUser.username.toLowerCase());

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    expect(usersAfter.map((u) => u.username)).toContain(newUser.username.toLowerCase());
  });
});

afterAll(() => {
  mongoose.connection.close();
});
