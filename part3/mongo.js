const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const dbPassword = process.argv[2]
const connectionUrl = `mongodb+srv://fullstack:${dbPassword}@cluster0.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(connectionUrl)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const ContactModel = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  ContactModel.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(c => {
      console.log(`${c.name} ${c.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const entryName = process.argv[3]
  const entryNumber = process.argv[4]

  const newContact = new ContactModel({
    name: entryName,
    number: entryNumber,
  })

  newContact.save().then(() => {
    console.log(`added ${entryName} number ${entryNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  mongoose.connection.close()
}