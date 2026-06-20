const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    
    return blogs.reduce((max, blog) => {
      return (blog.likes || 0) > (max.likes || 0) ? blog : max
    }, blogs[0])
  }
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
  
    const authorCounts = {}
    let topAuthor = ''
    let maxBlogs = 0
  
    for (const blog of blogs) {
      authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
      if (authorCounts[blog.author] > maxBlogs) {
        maxBlogs = authorCounts[blog.author]
        topAuthor = blog.author
      }
    }
  
    return { author: topAuthor, blogs: maxBlogs }
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
  
    const authorLikes = {}
    let topAuthor = ''
    let maxLikes = 0
  
    for (const blog of blogs) {
      authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
      if (authorLikes[blog.author] > maxLikes) {
        maxLikes = authorLikes[blog.author]
        topAuthor = blog.author
      }
    }
  
    return { author: topAuthor, likes: maxLikes }
  }
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }