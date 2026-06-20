const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    id: '5a422aa71b54a676234d17f7',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/to-statements/to-statements.html',
    likes: 5
  }
]

const multipleBlogs = [
  { id: '1', title: 'React patterns', author: 'Michael Chan', url: 'url1', likes: 7 },
  { id: '2', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'url2', likes: 5 },
  { id: '3', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'url3', likes: 12 }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    assert.strictEqual(result, 24)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    assert.deepStrictEqual(result, multipleBlogs[2])
  })
})
describe('most blogs', () => {
  const listWithMultipleBlogs = [
    { title: 'Blog 1', author: 'Robert C. Martin', likes: 2 },
    { title: 'Blog 2', author: 'Edsger W. Dijkstra', likes: 5 },
    { title: 'Blog 3', author: 'Robert C. Martin', likes: 4 },
    { title: 'Blog 4', author: 'Robert C. Martin', likes: 1 }
  ]

  test('finds the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const listWithMultipleBlogs = [
    { title: 'Blog 1', author: 'Robert C. Martin', likes: 2 },
    { title: 'Blog 2', author: 'Edsger W. Dijkstra', likes: 15 },
    { title: 'Blog 3', author: 'Robert C. Martin', likes: 4 },
    { title: 'Blog 4', author: 'Robert C. Martin', likes: 1 }
  ]

  test('finds the author with the most total likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 15
    })
  })
})