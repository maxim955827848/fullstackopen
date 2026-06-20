const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'blogs.json');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([
    { id: '1', title: 'Next.js App Router Deep Dive', author: 'Dan Abramov', url: 'https://nextjs.org', likes: 15 },
    { id: '2', title: 'Mastering Server Actions', author: 'Lee Robinson', url: 'https://nextjs.org', likes: 48 }
  ], null, 2));
}

export function getBlogs() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function addBlog(blog) {
  const blogs = getBlogs();
  blogs.push(blog);
  fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
}
