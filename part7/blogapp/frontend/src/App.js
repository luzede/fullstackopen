import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    const u = window.localStorage.getItem('user')
    if (u) {
      dispatch(setUser(JSON.parse(u)))
      blogService.setToken((JSON.parse(u)).token)
    }
  }, [dispatch])

  return (
    (user === null)
      ?
      <div>
        <Notification />
        <Login />
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
