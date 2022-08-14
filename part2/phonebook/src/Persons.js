import phones from './services/phones'

const Persons = ({persons, filtered, setPersons}) => {
    const handleClick = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phones.deleteContact(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                }).catch(error => {
                    alert(error.response.data.error)
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