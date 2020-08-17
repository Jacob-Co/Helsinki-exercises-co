import React, { useState, useEffect } from 'react';
import Persons from './Persons'
import personService from './../services/persons'

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
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

  const handleDeletePerson = (e) => {
    const id = Number(e.target.value);
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(deletedId => {
          setPersons(persons.filter(person => person.id !== deletedId))
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault();
    const newNumberMessage = `${newName} is already in the phonebook, ` +
      `do you want to update the number`;

    if (duplicateName(newName)) {
      if (newNumber === '') return alert(`${newName} is already added to phonebook`);
      if (window.confirm(newNumberMessage)) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        const modifiedPerson = {...person, number: newNumber, name: newName};

        personService
          .edit(person.id, modifiedPerson)
          .then(returnPerson => {
            setPersons(persons.map(person => { 
              return person.name.toLowerCase() === returnPerson.name.toLowerCase()
                ? returnPerson
                : person
            }));
            setNewName('');
            setNewNumber('');
          })
      };
    } else {
      const newPersonObj = { name: newName, number: newNumber };
      personService
        .create(newPersonObj)
        .then(returnedPersonObj => {
          setPersons(persons.concat(returnedPersonObj));
          setNewName('');
          setNewNumber('');
        })
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
      <Persons persons={personsToShow} handleDeleteBtn={handleDeletePerson}/>
    </div>
  )
}

export default App