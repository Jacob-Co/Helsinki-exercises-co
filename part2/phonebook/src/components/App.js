import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

const PersonForm = ({newName, newNumber, handleOnNameChange, handleOnNumberChange, handleFormSubmit}) => {
  return (
    <form onSubmit={handleFormSubmit}>
    <div>
      name: <input value={newName} type="text" onChange={handleOnNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} type="text" onChange={handleOnNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({filter, handleOnChange}) => {
  return (
    <div>
      filter contacts by name: <input value={filter} onChange={handleOnChange}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const personsToShow = (filter === '') 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const duplicateName = (name) => {
   return !!(persons.find(person => person.name.toLowerCase() === name.toLowerCase()));
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    if (duplicateName(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleOnChange={handleFilterChange}/>
      <h3>Add a new Contact</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleFormSubmit={addPerson}
        handleOnNameChange={handleNameChange}
        handleOnNumberChange={handleNumberChange}
      />
      <h3>Contacts</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App