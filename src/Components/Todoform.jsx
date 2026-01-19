import React from 'react'
import { useTodo } from '../Context/Todocontext.js';

function TodoForm() {
    const [todo , setTodo]=React.useState("")
    const [deadline , setDeadline]=React.useState("")
    const [showDeadline, setShowDeadline] = React.useState(false)
    const dateRef = React.useRef(null)
    const {addTodo} = useTodo();
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!todo) return;
        addTodo({text: todo, completed: false, deadline: deadline});
        setTodo("");
        setDeadline("");
        setShowDeadline(false);
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What needs to be done?</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-lg opacity-80">📝</span>
                        <input
                            type="text"
                            placeholder="What do you want to accomplish today?"
                            className="w-full pl-10 border-2 border-indigo-200 rounded-xl px-4 outline-none duration-200 bg-white/80 backdrop-blur-sm py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 shadow-sm"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={() => setShowDeadline((s) => !s)}
                    className={`rounded-lg px-3 py-3 border-2 transition-colors shrink-0 ${showDeadline ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    title={showDeadline ? 'Hide deadline' : 'Add deadline'}
                >
                    📅
                </button>
                <button 
                    type="submit" 
                    className="rounded-xl px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-bold shrink-0 hover:from-blue-600 hover:to-blue-700 transition-transform shadow-md hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5"
                >
                    <span className="mr-2">➕</span>Add
                </button>
            </div>
            
            {showDeadline && (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        if (dateRef.current) {
                            dateRef.current.focus()
                            if (typeof dateRef.current.showPicker === 'function') {
                                try { dateRef.current.showPicker() } catch (e) {}
                            }
                        }
                    }}
                >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date (Optional)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-lg opacity-80">📅</span>
                        <input
                            ref={dateRef}
                            type="datetime-local"
                            className="w-full pl-10 border-2 border-purple-200 rounded-xl px-4 outline-none duration-200 bg-white/80 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 shadow-sm"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            title="Set deadline for this task"
                        />
                    </div>
                </div>
            )}
        </form>
    );
}

export default TodoForm;

