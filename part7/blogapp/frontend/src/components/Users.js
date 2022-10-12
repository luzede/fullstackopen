import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = () => {
  const users = useSelector(state => state.users.map(user => ({ name: user.name, numberOfBlogs: user.blogs.length, id: user.id })))


  return (
    <Table striped>
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
    </Table>
  )
}

export default Users