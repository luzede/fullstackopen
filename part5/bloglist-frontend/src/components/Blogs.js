import Blog from './Blog'

const Blogs = ({blogs, setBlogs, userId}) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} userId={userId} />
      )}
    </>
  )
}

export default Blogs