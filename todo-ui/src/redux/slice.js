import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'activeTask',
  initialState: 0,
  reducers: {
    markActive: (state) => state + 1,
    markDeactive: (state) => state - 1,
  },
})

export const { markActive, markDeactive } = todoSlice.actions
export default todoSlice.reducer
