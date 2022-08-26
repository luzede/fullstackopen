const Logout = ({ onClick }) => {
  const logout = () => {
    window.localStorage.clear()
    onClick()
  }
  return (
    <button onClick={logout}>logout</button>
  )
}

export default Logout