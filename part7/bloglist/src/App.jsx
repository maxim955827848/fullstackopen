import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { showNotification } from './reducers/notificationReducer'
import { createBlog, likeBlog } from './reducers/blogReducer'

const Menu = () => {
  const padding = { paddingRight: 15, textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }
  return (
    <div style={{ background: '#eee', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

const BlogList = ({ blogs, title, author, url, setTitle, setAuthor, setUrl, handleCreate, handleLike }) => (
  <div>
    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
      <h3>Create New</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required />
      <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Create</button>
    </form>

    <h3>Blogs</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {blogs.map(blog => (
        <div key={blog.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
            {blog.title} (by {blog.author})
          </Link>
        </div>
      ))}
    </div>
  </div>
)

const UsersView = ({ users, blogs }) => {
  const getUserBlogCount = (username) => {
    return blogs.filter(b => b.author.toLowerCase() === username.toLowerCase()).length
  }

  return (
    <div>
      <h3>Users</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>User</th>
            <th style={{ padding: '8px' }}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={{ padding: '8px' }}>{getUserBlogCount(user.username)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const UserView = ({ user, blogs }) => {
  if (!user) return null
  const userBlogs = blogs.filter(b => b.author.toLowerCase() === user.username.toLowerCase())

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {userBlogs.length === 0 ? (
        <p>No blogs added yet</p>
      ) : (
        <ul>
          {userBlogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

const BlogView = ({ blog, handleLike }) => {
  if (!blog) return null

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h2>{blog.title} by {blog.author}</h2>
      <div style={{ margin: '10px 0' }}>
        URL: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div style={{ margin: '10px 0' }}>
        Likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog.id, blog.title)}>Like</button>
      </div>
    </div>
  )
}

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const handleCreate = (e) => {
    e.preventDefault()
    const newBlog = {
      id: Math.round(Math.random() * 10000),
      title,
      author,
      url,
      likes: 0
    }
    dispatch(createBlog(newBlog))
    dispatch(showNotification(`Blog "${title}" created!`, 3))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLike = (id, blogTitle) => {
    dispatch(likeBlog(id))
    dispatch(showNotification(`Liked "${blogTitle}"`, 2))
  }

  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === Number(blogMatch.params.id)) : null

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Blog list</h1>
      <Menu />
      
      {notification && (
        <div style={{ border: '2px solid green', padding: '10px', marginBottom: '20px', borderRadius: '5px', backgroundColor: '#e6f4ea' }}>
          {notification}
        </div>
      )}

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreate={handleCreate} handleLike={handleLike} />} />
        <Route path="/users" element={<UsersView users={users} blogs={blogs} />} />
        <Route path="/users/:id" element={<UserView user={user} blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} handleLike={handleLike} />} />
      </Routes>
    </div>
  )
}

export default App
