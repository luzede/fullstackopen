import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (t) => {
  token = `bearer ${t}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token},
  })
  console.log(response);
  return response.data;
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, {
    headers: { Authorization: token}
  })
  return response.data
}


const o = {
  getAll,
  setToken,
  create,
  update,
}
export default o