'use client'
import { useState } from 'react'

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  return (
    <button 
      onClick={() => setLikes(likes + 1)} 
      style={{ padding: '5px 10px', background: '#e1e8ed', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      ❤️ {likes}
    </button>
  )
}
