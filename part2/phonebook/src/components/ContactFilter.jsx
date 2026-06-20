import React from 'react'

const ContactFilter = ({ query, onQueryChange }) => (
  <div>
    filter shown with <input value={query} onChange={onQueryChange} />
  </div>
)

export default ContactFilter