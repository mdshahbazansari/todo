import TodoSchema from './todoSchema.js'

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body
    const titleRegExp = new RegExp('^' + title + '$', 'i')

    const isTodo = await TodoSchema.findOne({ title: titleRegExp })

    if (isTodo)
      return res.status(500).json({ message: 'already exist this Todo' })

    const todo = await TodoSchema.create(req.body)

    if (!todo) {
      return res.status(400).json({ message: 'Please write a valid todo' })
    }

    res.json({ message: 'Todo created!', todo })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchTodo = async (req, res) => {
  try {
    let { limit, page } = req.query

    if (!limit) {
      limit = 8
    }

    if (!page) {
      page = 1
    }

    const skip = Number((page - 1) * limit)
    const total = await TodoSchema.countDocuments()
    const todo = await TodoSchema.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    if (!todo) {
      return res.status(404).json({ message: 'Invalid todo request' })
    }

    res.json({ todo, total })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchTodoPage = async (req, res) => {
  try {
    let { limit, page } = req.query

    if (!limit) {
      limit = 5
    }

    if (!page) {
      page = 1
    }

    const skip = (page - 1) * limit
    const total = await TodoSchema.countDocuments()
    const todo = await TodoSchema.find().skip(skip).limit(limit)
    // .sort({ createdAt: -1 })

    if (!todo) {
      return res.status(404).json({ message: 'Invalid todo request' })
    }

    res.json({ todo, total })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await TodoSchema.findByIdAndUpdate(id, req.body, { new: true })

    if (!todo) {
      return res.status(404).json({ message: 'Invalid todo id !' })
    }

    res.json({ message: 'Todos updated !', todo })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await TodoSchema.findByIdAndDelete(id)

    if (!todo) {
      return res.status(404).json({ message: 'Invalid todo id !' })
    }

    res.json({ message: 'Todos Deleted !', todo })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
