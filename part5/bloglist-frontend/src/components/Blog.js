import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
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
      </div>
    </div>
  )
}

export default Blog