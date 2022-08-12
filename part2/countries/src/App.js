import { useState, useEffect } from 'react'
import axios from 'axios'


import Results from './Results'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [showHide, setShowHide] = useState(Object.fromEntries(
        countries.map(country => [country.name.common, false])))

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            <div>
                find countries <input value={search} onChange={e => {
                    setSearch(e.target.value)
                    setFilteredCountries(countries.filter(country => {
                        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
                    }))
                    if (filteredCountries.length <= 10) {
                        setShowHide({ ...showHide, ...Object.fromEntries(filteredCountries.map(country => [country.name.common, false]))})
                    }  
                }} />
            </div>
            <Results filteredCountries={filteredCountries} showHide={showHide} setShowHide={setShowHide} />
        </div>
    )
}

export default App