import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ userId }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} userId={userId} />
      )}
    </>
  )
}

export default Blogs