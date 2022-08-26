const Login = ({ handleLogin, username, password, setUsername, setPassword }) => {
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
        <button type="submit" value="login">login</button>
      </form>
    </>
  )
};

export default Login;