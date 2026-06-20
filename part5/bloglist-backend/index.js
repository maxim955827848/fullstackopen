const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let blogs = [
  { id: "1", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { id: "2", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 }
]

app.get('/api/blogs', (req, res) => res.json(blogs))
app.post('/api/blogs', (req, res) => {
  const body = req.body
  const newBlog = { id: String(blogs.length + 1), title: body.title, author: body.author, url: body.url, likes: body.likes || 0 }
  blogs = blogs.concat(newBlog)
  res.status(201).json(newBlog)
})
app.post('/api/login', (req, res) => {
  res.status(200).send({ token: 'mock-token', username: 'mluukkai', name: 'Matti Luukkainen' })
})

const PORT = 3003
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`))
