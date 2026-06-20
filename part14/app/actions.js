'use server'
import { addBlog } from '../lib/db'
import { revalidatePath } from 'next/cache'

export async function createBlog(formData) {
  const title = formData.get('title')
  const author = formData.get('author')
  const url = formData.get('url')

  if (!title || !url) return

  const newBlog = {
    id: Date.now().toString(),
    title,
    author: author || 'Anonymous',
    url,
    likes: 0
  }

  addBlog(newBlog)
  revalidatePath('/blogs')
}
