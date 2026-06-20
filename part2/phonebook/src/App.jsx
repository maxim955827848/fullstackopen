import { useState, useEffect } from 'react'
import ContactFilter from './components/ContactFilter'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import StatusBanner from './components/StatusBanner'
import contactService from './services/contactService'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [bannerMsg, setBannerMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const triggerNotification = (messageText, errorStatus = false) => {
    setBannerMsg(messageText)
    setIsError(errorStatus)
    setTimeout(() => {
      setBannerMsg(null)
    }, 4000)
  }

  const handleAddContact = (event) => {
    event.preventDefault()

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newName.trim().toLowerCase()
    )

    if (existingContact) {
      const confirmUpdate = window.confirm(
        `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedContact = { ...existingContact, number: newNumber.trim() }

        contactService
          .update(existingContact.id, updatedContact)
          .then(returnedContact => {
            setContacts(contacts.map(c => c.id !== existingContact.id ? c : returnedContact))
            setNewName('')
            setNewNumber('')
            triggerNotification(`Updated number for ${returnedContact.name}`)
          })
          .catch(() => {
            triggerNotification(`Information of ${existingContact.name} has already been removed from server`, true)
            setContacts(contacts.filter(c => c.id !== existingContact.id))
          })
      }
      return
    }

    const newEntry = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    contactService
      .create(newEntry)
      .then(returnedContact => {
        setContacts(contacts.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        triggerNotification(`Added ${returnedContact.name}`)
      })
  }

  const handleDeleteContact = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    
    if (confirmDelete) {
      contactService
        .remove(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id))
          triggerNotification(`Deleted ${name}`)
        })
        .catch(() => {
          triggerNotification(`Information of ${name} has already been removed from server`, true)
          setContacts(contacts.filter(c => c.id !== id))
        })
    }
  }

  const contactsToShow = searchQuery.trim() === ''
    ? contacts
    : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <StatusBanner text={bannerMsg} isAlert={isError} />
      
      <ContactFilter 
        query={searchQuery} 
        onQueryChange={(e) => setSearchQuery(e.target.value)} 
      />

      <h3>Add a new</h3>
      
      <ContactForm 
        onSubmitEvent={handleAddContact}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      
      <ContactList 
        filteredContacts={contactsToShow} 
        onDeleteContact={handleDeleteContact}
      />
    </div>
  )
}

export default App