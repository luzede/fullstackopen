
const Persons = ({persons, filtered}) => {
    return (
        <div>
            {persons
                .filter(person => 
                    person.name.toLowerCase().includes(filtered.toLowerCase()))
                .map(person => 
                    <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;