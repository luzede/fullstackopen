import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'


const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (err) => {
      console.log(err);
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('authorization-token', token)
      setToken(token)
    }
  }, [result.data]) //eslint-disable-line
  
  const submit = (event) => {
    event.preventDefault()

    login({
      variables: {
        username: event.target.username.value,
        password: event.target[1].value
      }
    })

    setPage('books')
  }

  if (!show) return null
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="password" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm