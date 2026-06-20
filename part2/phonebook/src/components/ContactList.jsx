import React from 'react'

const ContactList = ({ filteredContacts, onDeleteContact }) => (
  <div>
    {filteredContacts.map(entry => (
      <p key={entry.id || entry.name}>
        {entry.name} {entry.number} {' '}
        <button onClick={() => onDeleteContact(entry.id, entry.name)}>delete</button>
      </p>
    ))}
  </div>
)

export default ContactList