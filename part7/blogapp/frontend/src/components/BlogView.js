import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'

const BlogView = ({ id }) => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  const handleClick = () => {
    dispatch(updateBlog(id,
      {
        ...blog,
        likes: blog.likes + 1,
      }
    ))
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={handleClick}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
    </div>
  )

}

export default BlogView