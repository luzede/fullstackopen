import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'


const CommentsView = ({ blog }) => {

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target[0].value
    dispatch(updateBlog(blog.id,
      {
        ...blog,
        comments: blog.comments.concat(comment)
      }
    ))
  }

  return (
    <div>
      <p><b>comments</b></p>
      <form onSubmit={handleSubmit}>
        <input type='text' name='comment' required />
        <button type='submit' name='comment' >submit</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentsView