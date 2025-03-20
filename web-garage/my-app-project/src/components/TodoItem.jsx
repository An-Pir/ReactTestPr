import { useState } from 'react';

const TodoItem = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className=' group flex items-center justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg h-15 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100'>
      <div className='flex items-center gap-3 '>
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`p-1 rounded-full border-2 ${
            isCompleted
              ? 'border-green-500 bg-green-500'
              : 'border-gray-300 hover:border-gray-400'
          } transition-colors duration-300`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className={`h-4 w-4 ${
              isCompleted ? 'text-white' : 'text-transparent'
            }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
              stroke='currentColor'
            />
          </svg>
        </button>
        <span
          className={`text-1 ${
            isCompleted
              ? 'line-through text-gray-400'
              : ' text-gray-700 dark:text-gray-300'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          className='w-6 h-6'
          viewBox='0 0 16 16'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
          <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
