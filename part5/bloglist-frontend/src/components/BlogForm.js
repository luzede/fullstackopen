import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmit = async (event) => {
    event.preventDefault()
    const target = event.target;
      const blog = {
        title: target[0].value,
        author: target[1].value,
        url: target[2].value,
      }
    await createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  
  return (
    <>
      <h2><b>create a blog</b></h2>
      <form onSubmit={blogSubmit}>
       <div>
        title: 
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} required />
       </div>
       <div>
        author: 
        <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} required />
       </div>
       <div>
        url: 
        <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} required />
       </div>
       <button type="submit" value="create">create</button>
      </form>
    </>
  )
}

export default BlogForm