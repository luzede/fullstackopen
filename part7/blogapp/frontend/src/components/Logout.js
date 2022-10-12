import { Button } from 'react-bootstrap'

const Logout = ({ onClick }) => {
  const logout = () => {
    window.localStorage.clear()
    onClick()
  }
  return (
    <Button onClick={logout}>logout</Button>
  )
}

export default Logout