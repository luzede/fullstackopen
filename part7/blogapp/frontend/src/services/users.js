import axios from 'axios'

const getUser = async (username) => {
  const response = await axios.get('/api/users')
  const user = response.data.find((u) => u.username === username)
  return user
}

const getAll = async () => {
  const response = await axios.get('/api/users')
  const users = response.data
  return users
}

const o = {
  getUser,
  getAll,
}

export default o

