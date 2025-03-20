import { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <div className='flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Добавить задачу... '
          className=' flex-1 p-4 text-gray-700 dark:bg-page-dark dark:text-text-dark outline-none placeholder-gray-400'
        />
        <button
          type='submit'
          className=' p-2 bg-btn-light hover:bg-btn-light-hv text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-all duration-300 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v8m-4-4h8'
              stroke='currentColor'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
