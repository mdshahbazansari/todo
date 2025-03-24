import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodoPage,
  updateTodo,
} from './todoController.js'

const todoRouter = Router()

todoRouter.post('/', createTodo)
todoRouter.get('/', fetchTodo)
todoRouter.put('/:id', updateTodo)
todoRouter.delete('/:id', deleteTodo)

export default todoRouter
