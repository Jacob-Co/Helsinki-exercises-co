import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import personService from './../services/persons';
import Notification, {clearNotification} from './Notification';

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
  const [ notificationObj, setNotificationObj] = useState(null);

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
    const id = e.target.value;
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(deletedId => {
          setPersons(persons.filter(person => person.id !== deletedId))
        })
    }
  }

  const modifyNumber = () => {
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
        setNotificationObj({success: true, message: `Modifed the number of ${returnPerson.name} to ${returnPerson.number}`});
        setNewName('');
        setNewNumber('');
      })
      .catch(e => {
        setNotificationObj({success: false, message: e.response.data.error});
        setNewName('');
        setNewNumber('');
      });
  }

  const addPerson = () => {
    const newPersonObj = { name: newName, number: newNumber };
    personService
      .create(newPersonObj)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson));
        setNotificationObj({success: true, message: `Added ${returnPerson.name}`});
        setNewName('');
        setNewNumber('');
      })
      .catch( e => {
        setNotificationObj({success: false, message: `${e.response.data.error}`});
      });
  }

  const handlePersonFormSubmit = (e) => {
    e.preventDefault();
    const newNumberMessage = `${newName} is already in the phonebook, ` +
      `do you want to update the number?`;

    if (duplicateName(newName)) {
      if (window.confirm(newNumberMessage)) modifyNumber();
    } else {
      addPerson();
    }
    clearNotification(() => setNotificationObj(null));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationObj={notificationObj} />
      <Filter filter={filter} handleOnChange={handleFilterChange}/>
      <h3>Add a new Contact</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleFormSubmit={handlePersonFormSubmit}
        handleOnNameChange={handleNameChange}
        handleOnNumberChange={handleNumberChange}
      />
      <h3>Contacts</h3>
      <Persons persons={personsToShow} handleDeleteBtn={handleDeletePerson}/>
    </div>
  )
}

export default App