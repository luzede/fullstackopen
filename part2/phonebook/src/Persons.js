import phones from './services/phones'

const Persons = ({persons, filtered, setPersons, setSuccessError}) => {
    const handleClick = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phones.deleteContact(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                }).catch(error => {
                    setSuccessError({ type: 'error', message:`Information of ${person.name} has already been removed from server`})
                    
                    setTimeout(() => {
                        setSuccessError({})
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== person.id))
                }
            )
        }
    }

    return (
        <div>
            {persons
                .filter(person => 
                    person.name.toLowerCase().includes(filtered.toLowerCase()))
                .map(person => 
                    <p key={person.name}>{person.name} {person.number} <button type='button' onClick={() => handleClick(person)}>delete</button></p>)}
        </div>
    )
}

export default Persons;