import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [
    { id: '1', name: 'Matti Luukkainen', username: 'mluukkai' },
    { id: '2', name: 'Arto Hellas', username: 'hellas' }
  ],
  reducers: {}
})

export default userSlice.reducer
