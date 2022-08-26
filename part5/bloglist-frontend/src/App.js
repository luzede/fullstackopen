import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'

const App = () => {
  //blogs
  const [blogs, setBlogs] = useState([])
  // login
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault()
    // 0 - username
    // 1 - passowrd
    // 2 - button
    try {
      const user = await loginService.login(
        event.target[0].value.toLowerCase(),
        event.target[1].value
      )
      setUser(user);
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    }
    catch (err) {
      throw err
    }
  }

  const blogSubmit = async (event) => {
    event.preventDefault()
    
    const target = event.target;
    const blog = {
      title: target[0].value,
      author: target[1].value,
      url: target[2].value,
    }
    const addedBlog = await blogService.create(blog)
    setBlogs(blogs.concat(addedBlog))
  }

  


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const u = window.localStorage.getItem('user');
    if (u) {
      setUser(JSON.parse(u))
      blogService.setToken((JSON.parse(u)).token)
    }
  }, [])

  return (
      (user === null)
      ?
      <div>
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
      :
      <div>
        <h2><b>blogs</b></h2>
        <p>
          {user.name} logged in
          <Logout onClick={() => setUser(null)} />
        </p>
        <BlogForm blogSubmit={blogSubmit} />
        <Blogs blogs={blogs} />
      </div>
  )
}

export default App
