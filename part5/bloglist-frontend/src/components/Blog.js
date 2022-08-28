/* eslint-disable no-useless-catch */
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const like = async () => {
    try {
      const updatedBlog = await blogService
        .update(blog.id, {
          user: blog.user.id,
          likes: likes + 1,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        })
      setLikes(updatedBlog.likes)
    }
    catch(err) {
      throw err
    }
  }

  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.del(blog.id)
        setBlogs(blogs.filter(b => (
          b.id !== blog.id
        )))
      }
    }
    catch (err) {
      throw err
    }
  }

  const visibility = { display: view ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button name='view' onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      </div>
      <div style={visibility}>
        <p>{blog.url}</p>
        <p>{likes} <button name='likes' onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
        {userId === blog.user.id
          ? <button name='delete' onClick={deleteBlog}>delete</button>
          : null
        }

      </div>
    </div>
  )
}

export default Blog