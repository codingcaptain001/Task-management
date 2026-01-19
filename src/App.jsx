import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import Todoform from './Components/Todoform.jsx'
import TodoItem from './Components/TodoItem.jsx'

function App() {
  const [todos, setTodos] = useState([
  ])
  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos])
  }

  const updateTodo = (id, todo) => {
  setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? { ...prevtodo, ...todo } : prevtodo))
}
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id))
  }
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, toggleTodo, updateTodo }}>
      <div 
        className="w-screen h-screen fixed inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?cs=srgb&dl=pexels-content-pixie-1405717-2736499.jpg&fm=jpg')`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Todo Container */}
        <div className="relative w-full max-w-3xl mx-auto px-4 h-[90vh] flex flex-col overflow-hidden">
          <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-xl px-6 py-6 text-gray-800 border border-white/30 flex-1 flex flex-col overflow-hidden">
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 pb-2 border-b-4 border-blue-300 inline-block">
                My Tasks
              </h1>
              <p className="text-sm text-gray-600 mt-3">Organize, prioritize and conquer your day</p>
            </div>
          
            <div className="mb-4 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200/50">
              {/* Todo form goes here */}
              <Todoform />
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="flex flex-col gap-3">
                {/*Loop and Add TodoItem here */}
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    <div key={todo.id} className="w-full">
                      <TodoItem todo={todo} />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-gray-400 text-lg">No todos yet. Add one to get started! 🚀</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
