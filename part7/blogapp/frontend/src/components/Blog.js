/* eslint-disable no-useless-catch */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const [view, setView] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)

  const like = async () => {
    try {
      // const updatedBlog = await blogService
      //   .update(blog.id, {
      //     user: blog.user.id,
      //     likes: likes + 1,
      //     author: blog.author,
      //     title: blog.title,
      //     url: blog.url,
      //   })
      // setLikes(updatedBlog.likes)

      dispatch(updateBlog(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }))
    }
    catch (err) {
      throw err
    }
  }

  const delete_Blog = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog.id))
      }
    }
    catch (err) {
      throw err
    }
  }

  const visibility = { display: view ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`} >
          {blog.title} {blog.author}
        </Link>
        <Button variant='primary' name='view' className='view-button' onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</Button>
      </div>
      <div style={visibility} id='hiddenInfo'>
        <p>{blog.url}</p>
        <p>{blog.likes} <button name='likes' id='like-button' className='like-button' onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
        {userId === blog.user.id
          ? <Button variant='primary' name='delete' id='delete-button' onClick={delete_Blog}>delete</Button>
          : null
        }

      </div>
    </div>
  )
}

export default Blog