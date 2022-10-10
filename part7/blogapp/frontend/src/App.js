import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs, createBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  // login
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

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
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    }
    catch (err) {
      dispatch(setNotification(err.response.data.error, 'error', 5))
    }
  }

  const create_Blog = async (object) => {
    try {
      dispatch(createBlog(object))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog ${object.title} by ${object.author} added`, 'success', 5))
    }
    catch (err) {
      dispatch(setNotification(err.response.data.error, 'error', 5))
    }
  }

  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.slice().sort((a, b) => (b.likes - a.likes)))
    )
  }, [])
  useEffect(() => {
    const u = window.localStorage.getItem('user')
    if (u) {
      setUser(JSON.parse(u))
      blogService.setToken((JSON.parse(u)).token)
    }
  }, [])

  return (
    (user === null)
      ?
      <div>
        <Notification />
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
      :
      <div>
        <h2><b>blogs</b></h2>
        <Notification />
        <p>
          {user.name} logged in
          <Logout onClick={() => setUser(null)} />
        </p>
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={create_Blog} />
        </Toggleable>
        <Blogs userId={user.id} />
      </div>
  )
}

export default App
