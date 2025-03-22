import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import fetcher from '../../util/fetcher'
import { useDispatch, useSelector } from 'react-redux'
import { markActive, markDeactive } from '../redux/slice'

axios.defaults.baseURL = 'http://localhost:8080'

const Todo = () => {
  const dispatcher = useDispatch()
  const count = useSelector((state) => state.activeTodo)
  const todoActive = (e) => {
    const activeState = e.target.value
    if (e.target.checked) {
      dispatcher(markActive())
    } else {
      dispatcher(markDeactive())
    }
  }

  console.log(count)

  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useSWR(
    `todo?limit=8&page=${page}`,
    fetcher
  )

  const pagination = Math.ceil(data && data.total / 8)
  const pages = []
  for (let i = 1; i <= pagination; i++) {
    pages.push(i)
  }

  const pageId = (pageId) => {
    setPage(pageId)
  }

  const todos = {
    title: '',
  }
  const [input, setInput] = useState(todos)
  const [todoId, setTodoId] = useState(null)

  const handleInput = (e) => {
    const inputValue = {
      ...input,
      title: e.target.value,
    }
    setInput(inputValue)
  }

  const createTodo = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/todo', input)
      mutate(`todo?limit=8&page=${page}`)
      setInput({ title: '' })
      console.log(input)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/todo/${item._id}`)
      mutate(`todo?limit=8&page=${page}`)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEdit = (item) => {
    setTodoId(item._id)
    delete item._id
    setInput(item)
  }

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      await axios.put(`/todo/${todoId}`, input)
      mutate(`todo?limit=8&page=${page}`)
      setInput({ title: '' })
      setTodoId('')
    } catch (error) {
      console.log(error.message)
    }
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className='mt-4 flex flex-col items-center justify-center'>
      <div className='w-8/12 flex justify-center'>
        <form
          className='flex w-full'
          onSubmit={todoId ? handleSave : createTodo}
        >
          <input
            type='text'
            name='todo'
            value={input.title}
            onChange={handleInput}
            placeholder='To-Do Input'
            className='border py-1 px-2 rounded w-9/12'
          />
          {todoId ? (
            <button
              type='submit'
              className='px-4 py-1 bg-blue-200 rounded w-3/12 cursor-pointer'
            >
              Save TODO
            </button>
          ) : (
            <button
              type='submit'
              className='px-4 py-1 bg-green-200 rounded w-3/12 cursor-pointer'
            >
              Add TODO
            </button>
          )}
        </form>
      </div>
      <div className='my-2'>
        <h1 className='font-semibold'>Total Active To-Do:{count}</h1>
      </div>
      <div className='w-8/12'>
        {data &&
          data.todo.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-4 bg-gray-50 w-full m-2 px-2 py-2'
            >
              <div className='flex'>
                <input type='checkbox' onChange={todoActive} />
                <h1 className='pl-2 capitalize'>{item.title}</h1>
              </div>
              <div>
                <button
                  className='bg-blue-200 px-2 py-1 mx-2 rounded cursor-pointer'
                  onClick={() => handleEdit(item)}
                >
                  edit
                </button>
                <button
                  className='bg-rose-200 px-2 py-1 mx-2 rounded cursor-pointer'
                  onClick={() => handleDelete(item)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className='flex flex-row gap-4 mt-2'>
        {pages.map((item, index) => (
          <div key={index}>
            <button
              className='bg-gray-100 px-3 py-1 rounded-full cursor-pointer'
              onClick={() => pageId(item)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
