import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setSelectedCountry(null)
  }

  const filtered = searchTerm.trim() === ''
    ? []
    : countries.filter(c =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )

  const renderResults = () => {
    if (searchTerm.trim() === '') return null

    if (selectedCountry) {
      return <CountryDetails nation={selectedCountry} />
    }

    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (filtered.length === 1) {
      return <CountryDetails nation={filtered[0]} />
    }

    return (
      <ul>
        {filtered.map(c => (
          <li key={c.cca3}>
            {c.name.common}{' '}
            <button onClick={() => setSelectedCountry(c)}>show</button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <SearchBox term={searchTerm} onTermChange={handleSearchChange} />
      {renderResults()}
    </div>
  )
}

export default App
