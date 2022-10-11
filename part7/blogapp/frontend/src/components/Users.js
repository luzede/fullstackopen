import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.map(user => ({ name: user.name, numberOfBlogs: user.blogs.length, id: user.id })))

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  return (
    <table>
      <thead>
        <tr>
          <th><b>names</b></th>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`} >{user.name}</Link></td>
            <td>{user.numberOfBlogs}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Users