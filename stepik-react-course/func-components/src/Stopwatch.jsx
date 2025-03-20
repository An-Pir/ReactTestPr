import React, { useState, useEffect } from 'react';

const setDefaultCount = () => {
  const userCount = localStorage.getItem('count');
  return userCount ? +userCount : 0;
};

const Stopwatch = () => {
  const [count, setCount] = useState(setDefaultCount());
  const [start, setStart] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [resetCount, setResetCount] = useState()

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const handleReset = () => {
    writeValue(count);
    setCount(0);
    setStart(true);
  };

  const writeValue = (value) => {
    setLastResult(value);
    localStorage.setItem('lastResult', value);
  };

  useEffect(() => {
    localStorage.setItem('count', count);

    if (start) {
      const stopWatch = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
      return () => clearInterval(stopWatch);
    }
  }, [start, count]);

  return (
    <div>
      <h1>React Stopwatch</h1>
      <h3>{count}</h3>
      {!start ? (
        <button className='btn start' onClick={handleStart}>
          Start
        </button>
      ) : (
        <button className='btn stop' onClick={handleStop}>
          Stop
        </button>
      )}
      <button
        className='btn reset'
        onClick={handleReset}
        disabled={count === 0}
      >
        Reset
      </button>
      <p> Последний результат: {lastResult}</p>
    </div>
  );
};

export default Stopwatch;
