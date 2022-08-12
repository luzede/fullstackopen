import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'


const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>

            <p><b>languages:</b></p>
            <ul>
                {Array.from(Object.values(country.languages)).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common + "flag picture"} />

            <h2>Weather in {country.name.common}</h2>
            {
                weather !== null ? (
                    <div>
                        <p>temperature {weather.main.temp} Celsius</p>
                        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                        <p>wind {weather.wind.speed} m/s</p>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Country