import Todo from './components/Todo'

function App() {
  return (
    <div className='flex mx-auto items-center justify-center bg-gray-100 '>
      <div className='w-8/12 bg-white p-4 h-screen'>
        <h1 className='text-center text-2xl font-bold'>To-Do List</h1>
        <Todo />
      </div>
    </div>
  )
}

export default App
