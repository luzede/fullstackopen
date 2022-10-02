import { useEffect, useState } from "react"
import axios from "axios"


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data[0])
        console.log(response.data[0]);
      })
      .catch(err =>
        console.log(err)
      )
  }, [name])

  return country
}

