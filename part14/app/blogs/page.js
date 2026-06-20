import { getBlogs } from '../../lib/db'
import { createBlog } from '../actions'
import Link from 'next/link'
import LikeButton from '../components/LikeButton'

export default function BlogsPage() {
  const blogs = getBlogs()

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '650px', margin: '0 auto' }}>
      <p><Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Home</Link></p>
      <h2>Blog list</h2>

      <form action={createBlog} style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '25px 0', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fafafa' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Create new blog</h3>
        <input name="title" placeholder="Title" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="author" placeholder="Author" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input name="url" placeholder="URL" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Create
        </button>
      </form>

      <h3>Blogs</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs.map(blog => (
          <li key={blog.id} style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Link href={`/blogs/${blog.id}`} style={{ fontWeight: 'bold', color: '#0070f3', textDecoration: 'none', fontSize: '18px' }}>
                {blog.title}
              </Link>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Author: {blog.author}</div>
            </div>
            <LikeButton initialLikes={blog.likes} />
          </li>
        ))}
      </ul>
    </div>
  )
}
