const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
// const Blog = require('../models/blog');

test('A test to see if HTTP GET request works', () => {
  api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
