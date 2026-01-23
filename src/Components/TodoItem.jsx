import React from 'react'
import { useTodo } from '../Context/Todocontext.js';

function TodoItem({ todo }) {
    const { deleteTodo, toggleTodo, updateTodo } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoMsg, setTodoMsg] = React.useState(todo.text || '');
    const [highlighted, setHighlighted] = React.useState(!!todo.highlighted);

    const getDeadlineStatus = () => {
        if (!todo.deadline) return 'normal';
        const deadline = new Date(todo.deadline);
        const now = new Date();
        const diffInHours = (deadline - now) / (1000 * 60 * 60);
        if (diffInHours < 0) return 'overdue';
        if (diffInHours < 24) return 'urgent';
        if (diffInHours < 72) return 'soon';
        return 'normal';
    };

    const formatDeadline = (deadlineStr) => {
        if (!deadlineStr) return '';
        const date = new Date(deadlineStr);
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const deadlineStatus = getDeadlineStatus();

    const editTodo = () => {
        updateTodo(todo.id, { text: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleHighlight = () => {
        const nv = !highlighted;
        setHighlighted(nv);
        // persist highlight state on the todo
        if (typeof updateTodo === 'function') updateTodo(todo.id, { highlighted: nv });
    };

    const toggleCompleted = () => {
        toggleTodo(todo.id);
        setIsTodoEditable(false);
    };

    const statusColorClass = () => {
        switch (deadlineStatus) {
            case 'overdue':
                return 'border-red-300 bg-red-50';
            case 'urgent':
                return 'border-orange-300 bg-orange-50';
            case 'soon':
                return 'border-yellow-300 bg-yellow-50';
            default:
                return 'border-blue-200 bg-blue-50';
        }
    };

    return (
        <div className={`flex border-2 rounded-2xl overflow-hidden shadow-md transition-transform hover:-translate-y-1 ${todo.completed ? 'bg-green-50 border-green-200' : statusColorClass()} ${highlighted ? 'bg-linear-to-r from-yellow-50 to-yellow-100 shadow-2xl' : ''}`}>
            <div className={`${todo.completed ? 'bg-green-400' : (deadlineStatus === 'overdue' ? 'bg-red-500' : (deadlineStatus === 'urgent' ? 'bg-orange-400' : (deadlineStatus === 'soon' ? 'bg-yellow-400' : 'bg-indigo-400'))) } w-1`} />

            <div className="flex-1 px-4 py-3">
                <div className="flex items-start gap-x-3">
                    <input
                        type="checkbox"
                        className="cursor-pointer w-6 h-6 mt-1"
                        checked={!!todo.completed}
                        onChange={toggleCompleted}
                    />

                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-x-3">
                            <input
                                type="text"
                                className={`border-0 outline-none w-full bg-transparent font-semibold text-lg ${isTodoEditable ? 'border-b-2 border-indigo-300 pb-1' : ''} ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
                                value={todoMsg}
                                onChange={(e) => setTodoMsg(e.target.value)}
                                readOnly={!isTodoEditable}
                            />

                            <div className="flex items-center gap-2">
                                <button
                                    className={`w-9 h-9 rounded-md text-base flex items-center justify-center transition-shadow ${highlighted ? 'text-yellow-600' : 'text-gray-500'}`}
                                    onClick={toggleHighlight}
                                    title={highlighted ? 'Unhighlight' : 'Highlight'}
                                    aria-pressed={highlighted}
                                >
                                    <span className={`text-lg ${highlighted ? 'drop-shadow-md' : ''}`}>{highlighted ? '★' : '☆'}</span>
                                </button>

                                <button
                                    className="w-10 h-10 rounded-lg text-base border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center"
                                    onClick={() => {
                                        if (todo.completed) return;
                                        if (isTodoEditable) editTodo(); else setIsTodoEditable((p) => !p);
                                    }}
                                    title={isTodoEditable ? 'Save' : 'Edit'}
                                >
                                    {isTodoEditable ? '✓' : '✏️'}
                                </button>

                                <button
                                    className="w-10 h-10 rounded-lg text-base border-2 border-red-200 bg-red-50 hover:bg-red-100 flex items-center justify-center"
                                    onClick={() => deleteTodo(todo.id)}
                                    title="Delete"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {todo.deadline && (
                            <div className="mt-2 flex items-center justify-between">
                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-base">📅</span>
                                    <span>{formatDeadline(todo.deadline)}</span>
                                </div>

                                {!todo.completed && (
                                    <div className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${deadlineStatus === 'overdue' ? 'bg-red-500' : deadlineStatus === 'urgent' ? 'bg-orange-500' : deadlineStatus === 'soon' ? 'bg-yellow-500 text-black' : 'bg-indigo-600'}`}>
                                        {deadlineStatus === 'overdue' && 'OVERDUE'}
                                        {deadlineStatus === 'urgent' && 'DUE SOON'}
                                        {deadlineStatus === 'soon' && 'UPCOMING'}
                                        {deadlineStatus === 'normal' && 'ON TIME'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
