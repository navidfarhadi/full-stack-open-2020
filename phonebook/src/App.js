import React, { useState } from 'react';

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) =>
  {
    event.preventDefault()
    if (newName === "") return

    if(persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNewPerson = (event) =>
  {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <input value={newName} onChange={handleNewPerson}/>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name}
          </li>  
        )}
      </ul>
    </div>
  )
}

export default App;
