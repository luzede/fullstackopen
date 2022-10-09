const _ = require('lodash');

/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => blogs
  .reduce((favorite, blog) => (favorite.likes < blog.likes ? blog : favorite));

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _.maxBy(
    Object.entries(_.countBy(blogs, 'author')),
    ([_author, count]) => count,
  );
  console.log(authorWithMostBlogs);

  return {
    author: `${authorWithMostBlogs[0]}`,
    blogs: authorWithMostBlogs[1],
  };
};

const mostLikes = (blogs) => {
  const authorList = _.uniq(blogs.map((blog) => blog.author));
  const authorsWithTotalLikes = authorList.map((author) => {
    const blogsByAuthor = blogs.filter((blog) => blog.author === author);
    return {
      author,
      likes: totalLikes(blogsByAuthor),
    };
  });
  const authorWithMostLikes = _.maxBy(authorsWithTotalLikes, 'likes');

  return {
    author: authorWithMostLikes.author,
    likes: authorWithMostLikes.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
