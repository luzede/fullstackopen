/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => blogs
  .reduce((favorite, blog) => (favorite.likes < blog.likes ? blog : favorite));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
