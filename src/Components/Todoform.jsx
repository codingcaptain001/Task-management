import React from 'react';
import { useTodo } from '../Context/Todocontext.js';

function TodoForm() {
    const [todo, setTodo] = React.useState("");
    const [deadline, setDeadline] = React.useState("");
    const dateRef = React.useRef(null);
    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;

        addTodo({
            text: todo,
            completed: false,
            deadline: deadline || null,
        });

        setTodo("");
        setDeadline("");
    };

    const openDatePicker = () => {
        if (dateRef.current?.showPicker) {
            dateRef.current.showPicker();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <div className="flex gap-3 items-end">
                
                {/* Todo Input */}
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What needs to be done?
                    </label>

                    <div className="relative">
                        <span className="absolute left-3 top-3 text-lg opacity-80">📝</span>
                        <input
                            type="text"
                            placeholder="What do you want to accomplish today?"
                            className="w-full pl-10 border-2 border-indigo-200 rounded-xl px-4 py-3 bg-white/80 text-gray-900 placeholder-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 shadow-sm outline-none"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </div>
                </div>

                {/* Deadline Button */}
                <button
                    type="button"
                    onClick={openDatePicker}
                    className={`rounded-lg px-3 py-3 border-2 transition-colors shrink-0 focus:border-indigo-400
                        ${deadline 
                            ? 'bg-purple-100 border-purple-300 text-purple-700' 
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                    title="Set deadline"
                >
                    📅
                </button>

                {/* Add Button */}
                <button
                    type="submit"
                    className="rounded-xl px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-bold shrink-0 hover:from-blue-600 hover:to-blue-700 transition-transform shadow-md hover:shadow-lg active:scale-95"
                >
                    <span className="mr-2">➕</span>Add
                </button>
            </div>

            {/* Selected Deadline Preview */}
            {deadline && (
                <div className="text-sm text-purple-700 flex items-center gap-2">
                    <span>⏰</span>
                    <span>
                        Due: {new Date(deadline).toLocaleString()}
                    </span>
                </div>
            )}

            {/* Hidden Input (logic only) */}
            <input
                ref={dateRef}
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="hidden"
            />
        </form>
    );
}

export default TodoForm;
