
const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>

            <p><b>languages:</b></p>
            <ul>
                {Array.from(Object.values(country.languages)).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common + "flag picture"} />
        </>
    )
}

export default Country