import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/anecdotes/${id}`)
  return response.data
}

const add = async (anecdote) => {
  const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await get(id)
  const response = await axios.put(`${baseUrl}/anecdotes/${id}`, {...anecdote, votes: anecdote.votes + 1})
  return response.data
}

const object = {
  getAll,
  get,
  add,
  vote,
}
export default object