import React from 'react';
import './App.css';

function App() {

  const outPut = React.createRef()

  const showInput = ()=> {
 console.log(outPut)
  }

  const f1 = (arg) => {
    console.log('f1 work' + arg);
  }


  return (
    <>
      <h1>События</h1>
      <section>
        <h2>Button</h2>
        <button onClick={() => f1(1)}>Push</button>
      </section>
      <section>
        <h2>Double click + mouse move</h2>
        <div className='test' onDoubleClick = {() => f1(2)} ></div>
      </section>
      <section>
        <h2>input</h2>
        <input type="text" ref={outPut} />
        <p></p>
      </section>
    </>
  );
}

export default App;
