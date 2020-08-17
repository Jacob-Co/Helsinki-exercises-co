import React from 'react';

const Person = ({person, handleDeleteBtn}) => {
  return (
    <div>
      {person.name} {person.number + '  '}
      <button onClick={handleDeleteBtn} value={person.id}>delete</button>
    </div>
  )
}

const Persons = ({persons, handleDeleteBtn}) => {
  return (
    <>
      {persons.map(person => <Person 
        key={person.name} 
        person={person}
        handleDeleteBtn={handleDeleteBtn}
        />
      )}
    </>
  )
}

export default Persons;