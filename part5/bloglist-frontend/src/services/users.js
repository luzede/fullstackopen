import axios from 'axios'

const getUser = async (username) => {
  const response = await axios.get('/api/users');
  const user = response.data.find((u) => u.username === username);
  return user;
}

const o = {
  getUser,
}

export default o;

