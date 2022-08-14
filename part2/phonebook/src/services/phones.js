import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const add = (name, number) => {
    const request = axios.post(baseURL, { name, number })
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const exportObject = { getAll, add, deleteContact }

export default exportObject