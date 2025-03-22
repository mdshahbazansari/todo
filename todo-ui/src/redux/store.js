import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slice'

export const store = configureStore({
  reducer: {
    activeTodo: todoSlice,
  },
})
