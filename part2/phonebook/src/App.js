import { useState } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
    ])
    const [newName, setNewName] = useState('')

    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const [filtered, setFilter] = useState('')

    const handleInputName = (event) => {
        setNewName(event.target.value);
    }
    const handleInputNumber = (event) => {
        setNewPhoneNumber(event.target.value);
    }
    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
        setNewName('');
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filtered={filtered} handleFilter={handleFilter} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleInputName={handleInputName} newPhoneNumber={newPhoneNumber} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Persons persons={persons} filtered={filtered} />
        </div>
    )
}

export default App