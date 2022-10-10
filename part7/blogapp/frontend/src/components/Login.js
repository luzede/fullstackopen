// import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    // 0 - username
    // 1 - passowrd
    // 2 - button
    try {
      dispatch(login(
        event.target[0].value.toLowerCase(),
        event.target[1].value
      ))
      // dispatch(setUser(user))
      // blogService.setToken(user.token)
      // window.localStorage.setItem('user', JSON.stringify(user))
    }
    catch (err) {
      dispatch(setNotification(err.response.data.error, 'error', 5))
    }
  }


  return (
    <>
      <h2><b>login to application</b></h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit" value="login" id="login-button">login</button>
      </form>
    </>
  )
}

// Login.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   setPassword: PropTypes.func.isRequired,
// }

export default Login