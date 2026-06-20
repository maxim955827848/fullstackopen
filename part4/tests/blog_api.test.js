const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

let token
let userId

beforeEach(async () => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpassword', 10)
    const user = new User({ 
      username: 'testuser', 
      name: 'Test User', 
      passwordHash 
    })
    const savedUser = await user.save()
    userId = savedUser._id

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    const blogObject1 = new Blog({ ...initialBlogs[0], user: userId })
    const savedBlog1 = await blogObject1.save()
    savedUser.blogs = savedUser.blogs.concat(savedBlog1._id)

    const blogObject2 = new Blog({ ...initialBlogs[1], user: userId })
    const savedBlog2 = await blogObject2.save()
    savedUser.blogs = savedUser.blogs.concat(savedBlog2._id)

    await savedUser.save()
  } catch (error) {
    console.error('beforeEach error:', error)
    throw error
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property of the blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.ok(firstBlog.id)
    assert.strictEqual(firstBlog._id, undefined)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added when token is provided', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert.ok(titles.includes('Canonical string reduction'))
  })

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthenticated Blog',
      author: 'No Name',
      url: 'http://unauthorized.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const blogWithoutLikes = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCrapWeRideIn.html'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutLikes)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title or url is not added (400 Bad Request)', async () => {
    const badBlog = {
      author: 'Unknown Author'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(badBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and user is creator', async () => {
    const responseAtStart = await api.get('/api/blogs')
    const blogToDelete = responseAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    assert.strictEqual(responseAtEnd.body.length, initialBlogs.length - 1)

    const titles = responseAtEnd.body.map(r => r.title)
    assert.ok(!titles.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 and updates likes', async () => {
    const responseAtStart = await api.get('/api/blogs')
    const blogToUpdate = responseAtStart.body[0]

    const updatedData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 10
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})