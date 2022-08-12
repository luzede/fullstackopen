import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './Country'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    })

    return (
        <div>
            <div>
                find countries <input value={search} onChange={e => {
                    setSearch(e.target.value)
                    setFilteredCountries(countries.filter(country => {
                        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
                    }))
                }} />
            </div>
            {filteredCountries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : filteredCountries.length === 1 
                ? <Country country={filteredCountries[0]} />
                : filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
            <div>

            </div>
        </div>
    )
}

export default App