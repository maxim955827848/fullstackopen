import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [
    { id: 1, title: 'React hooks rule', author: 'Dan Abramov', url: 'https://react.dev', likes: 5 },
    { id: 2, title: 'Redux Toolkit is efficient', author: 'Mark Erikson', url: 'https://redux-toolkit.js.org', likes: 12 }
  ],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const id = action.payload
      const blogToLike = state.find(b => b.id === id)
      if (blogToLike) {
        blogToLike.likes++
      }
    }
  }
})

export const { createBlog, likeBlog } = blogSlice.actions
export default blogSlice.reducer
