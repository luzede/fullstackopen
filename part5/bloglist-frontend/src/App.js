import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [notification, setNotification] = useState(null);
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
      setNotification({
        type: 'error',
        message: err.response.data.error,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const createBlog = async (object) => {
    try {
      const addedBlog = await blogService.create(object)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      setNotification({
        type: 'success',
        message: `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (err) {
      setNotification({
        type: 'error',
        message: err.response.data.error,
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  const blogFormRef = useRef()



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
        {notification === null ? null : <Notification notification={notification} />}
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
      :
      <div>
        <h2><b>blogs</b></h2>
        {notification === null ? null : <Notification notification={notification} />}
        <p>
          {user.name} logged in
          <Logout onClick={() => setUser(null)} />
        </p>
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Toggleable>
        <Blogs blogs={blogs} />
      </div>
  )
}

export default App
