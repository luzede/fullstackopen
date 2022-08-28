import axios from 'axios'
import userService from './users'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, {
    username,
    password
  })
  const user = await userService.getUser(username)

  return {
    ...response.data,
    name: user.name,
    id: user.id,
  }
}

const o = {
  login,
}

export default o