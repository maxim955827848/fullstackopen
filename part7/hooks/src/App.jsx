import React, { useState } from 'react'
import { useField, useCountry, useResource } from './hooks'

const CountryFinder = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetchCountry = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  const { reset: resetName, ...nameProps } = nameInput

  return (
    <div style={{ background: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Country Finder</h2>
      <form onSubmit={fetchCountry}>
        <input {...nameProps} placeholder="e.g. ukraine, finland" />
        <button type="submit">find</button>
      </form>

      {country && (
        <div style={{ marginTop: '15px' }}>
          {!country.found ? (
            <span style={{ color: 'red' }}>Not found...</span>
          ) : (
            <div>
              <h3>{country.data.name.common}</h3>
              <div>capital: {country.data.capital[0]}</div>
              <div>population: {country.data.population}</div>
              <img src={country.data.flags.png} height='60' alt={`flag of ${country.data.name.common}`} style={{ marginTop: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}/>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const UltimateResources = () => {
  const contentInput = useField('text')
  const nameInput = useField('text')
  const numberInput = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: contentInput.value })
    contentInput.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: nameInput.value, number: numberInput.value })
    nameInput.reset()
    numberInput.reset()
  }

  const { reset: r1, ...contentProps } = contentInput
  const { reset: r2, ...nameProps } = nameInput
  const { reset: r3, ...numberProps } = numberInput

  return (
    <div style={{ background: '#eef9ff', padding: '20px', borderRadius: '8px' }}>
      <h2>Ultimate Hooks</h2>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div>
          <h3>Notes</h3>
          <form onSubmit={handleNoteSubmit}>
            <input {...contentProps} placeholder="new note..." />
            <button>create</button>
          </form>
          <ul>{notes.map(n => <li key={n.id}>{n.content}</li>)}</ul>
        </div>

        <div>
          <h3>Persons</h3>
          <form onSubmit={handlePersonSubmit}>
            name <input {...nameProps} /><br/>
            number <input {...numberProps} /><br/>
            <button>create</button>
          </form>
          <ul>{persons.map(p => <li key={p.id}>{p.name} {p.number}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Part 7: Custom Hooks Dashboard</h1>
      <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />
      <CountryFinder />
      <UltimateResources />
    </div>
  )
}

export default App
