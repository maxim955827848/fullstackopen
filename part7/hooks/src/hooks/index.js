import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => { setValue(event.target.value) }
  const reset = () => { setValue('') }
  return { type, value, onChange, reset }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({ found: true, data: response.data })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    if (baseUrl.includes('notes')) {
      setResources([
        { id: 1, content: 'Custom hooks are awesome' },
        { id: 2, content: 'FSO is the best web course' }
      ])
    } else if (baseUrl.includes('persons')) {
      setResources([
        { id: 1, name: 'Max Kushnir', number: '050-1234567' },
        { id: 2, name: 'Matti Luukkainen', number: '040-7654321' }
      ])
    }
  }, [baseUrl])

  const create = (resource) => {
    const newResource = { ...resource, id: Math.round(Math.random() * 10000) }
    setResources(resources.concat(newResource))
  }

  const service = { create }
  return [resources, service]
}
