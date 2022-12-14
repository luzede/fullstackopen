import { useState, useEffect } from 'react'
// import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import SuccessError from './SuccessError'
import phones from './services/phones'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [filtered, setFilter] = useState('')
    const [successError, setSuccessError] = useState({})

    useEffect(() => {
        phones.getAll().then(response => setPersons(response))
    }, [])

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
        const person = persons.find(p => p.name === newName)
        if (person) {
            phones.update(person.id, newName, newPhoneNumber)
                .then(response => {
                    setPersons(persons.map(p => p.id !== person.id ? p : response))
                })
                .catch(error => {
                    setSuccessError({ message: `${error.response.data.error}`, type: 'error' });

                    setTimeout(() => {
                        setSuccessError({});
                    }, 5000)
                })
            return;
        }
        phones.add(newName, newPhoneNumber)
            .then(response => {
                setSuccessError({ type: 'success', message: `${newName} has been added to phonebook` })
                setPersons(persons.concat(response))
                setNewName('')
                setNewPhoneNumber('')

                setTimeout(() => {
                    setSuccessError({})
                }, 5000)
            })
            .catch(error => {
                setSuccessError({ message: `${error.response.data.error}`, type: 'error' });

                setTimeout(() => {
                    setSuccessError({});
                }, 5000)
            })
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <SuccessError successError={successError} />
            <Filter filtered={filtered} handleFilter={handleFilter} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleInputName={handleInputName} newPhoneNumber={newPhoneNumber} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Persons persons={persons} filtered={filtered} setPersons={setPersons} setSuccessError={setSuccessError} />
        </div>
    )
}

export default App