require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const ContactModel = require('./models/contact')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('req-body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.get('/api/persons', (req, res) => {
  ContactModel.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.get('/info', (req, res) => {
  ContactModel.countDocuments({}).then(count => {
    const currentTime = new Date()
    res.send(`<p>Phonebook has info for ${count} people</p><p>${currentTime}</p>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  ContactModel.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  ContactModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const newContact = new ContactModel({
    name: body.name,
    number: body.number,
  })

  newContact.save().then(savedContact => {
    res.json(savedContact)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const updatedFields = {
    name: body.name,
    number: body.number,
  }

  ContactModel.findByIdAndUpdate(
    req.params.id, 
    updatedFields, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      if (updatedContact) {
        res.json(updatedContact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})