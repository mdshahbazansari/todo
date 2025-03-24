import { model, Schema } from 'mongoose'

const todoSchema = Schema(
  {
    title: {
      type: String,
      requird: true,
      trim: true,
    },
  },
  { timestamps: true }
)

const TodoSchema = model('todo', todoSchema)
export default TodoSchema
