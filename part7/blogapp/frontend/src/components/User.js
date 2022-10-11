import { useSelector } from 'react-redux'

const User = ({ id }) => {
  const user = useSelector(state => state.users.find(user => user.id === id))

  return (
    <div>
      <p><b>{user.name}</b></p>
      <p><b>added blogs</b></p>
      <ul>
        {user.blogs.map(blog => {
          return (
            <li key={blog.id}>
              {blog.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default User