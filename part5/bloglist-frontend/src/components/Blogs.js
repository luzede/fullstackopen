import Blog from './Blog'

const Blogs = ({blogs, name}) => {
  return (
    <>
      <h2>blogs</h2>
      <p><b>{name} logged in</b></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default Blogs