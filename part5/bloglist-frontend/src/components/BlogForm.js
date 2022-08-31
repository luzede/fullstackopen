import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmit = async (event) => {
    console.log(event)
    event.preventDefault()
    const blog = {
      title,
      author,
      url
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
          <input id='1' type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} required />
        </div>
        <div>
        author:
          <input id='2' type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} required />
        </div>
        <div>
        url:
          <input id='3' type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} required />
        </div>
        <button id='createButton' type="submit" value="create">create</button>
      </form>
    </>
  )
}

export default BlogForm