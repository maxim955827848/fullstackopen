import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#0070f3' }}>Part 14: Next.js</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>This page is server-side rendered.</p>
      <div style={{ margin: '40px 0' }}>
        <Link href="/blogs" style={{ padding: '12px 24px', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Open Blogs
        </Link>
      </div>
    </div>
  )
}
