import { useEffect, useState } from "react"
import axios from "axios"

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => {
        console.log(res.data);
        setResources(res.data)
      })
      .catch(err => console.log(err))
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(res => {
        console.log(res.data);
        setResources([...resources, res.data])
      })
      .catch(err => console.log(err))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
