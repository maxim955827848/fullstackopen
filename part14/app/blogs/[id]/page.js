import { getBlogs } from '../../../lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function BlogDetailPage({ params }) {
  const blogs = getBlogs()
  const blog = blogs.find(b => b.id === params.id)

  if (!blog) {
    notFound()
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <p><Link href="/blogs" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to blogs</Link></p>
      <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '8px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ margin: '0 0 15px 0', color: '#333' }}>{blog.title}</h1>
        <p style={{ fontSize: '16px' }}><strong>Author:</strong> {blog.author}</p>
        <p style={{ fontSize: '16px' }}><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noreferrer" style={{ color: '#0070f3' }}>{blog.url}</a></p>
        <p style={{ fontSize: '16px', color: '#e53e3e' }}><strong>Likes:</strong> {blog.likes}</p>
      </div>
    </div>
  )
}
