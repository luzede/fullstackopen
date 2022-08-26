import { useState } from 'react'

const BlogForm = ({ blogSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  
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