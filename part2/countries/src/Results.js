
import Country from './Country'


const Results = ({ filteredCountries, showHide, setShowHide }) => {
    

    const handleButton = (event, country) => {
        if (event.target.innerText === 'show') {
            // event.target.innerText = 'hide'
            setShowHide({ ...showHide, [country.name.common]: true })
        }
        else if (event.target.innerText === 'hide') {
            // event.target.innerText = 'show'
            setShowHide({ ...showHide, [country.name.common]: false })
        }
        console.log(event);
    }


    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    else if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]} />
    }
    else {
        return (
            filteredCountries.map(country => {
                if (showHide[country.name.common]) {
                    return (
                        <div key={country.name.common} id={country.name.common}>
                            <p>
                                {country.name.common}
                                <button type="button" onClick={(e) => handleButton(e, country)}>hide</button>
                            </p>
                            <Country country={country} />
                        </div>
                    )
                }
                else {
                    return (
                        <div key={country.name.common} id={country.name.common}>
                            <p>
                                {country.name.common}
                                <button type="button" onClick={(e) => handleButton(e, country)}>show</button>
                            </p>
                        </div>
                    )
                }
            })
        )
    }
}

export default Results