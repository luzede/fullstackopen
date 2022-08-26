import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'

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
      window.localStorage.setItem('user', JSON.stringify(user))
    }
    catch (err) {
      throw err
    }
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
    }
  }, [])

  return (
    [
      (user === null)
      ? //
      <div>
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
      : //
      <div>
        <Logout onClick={() => setUser(null)} />
        <Blogs blogs={blogs} name={user.name} />
      </div>
    ]
  )
}

export default App
