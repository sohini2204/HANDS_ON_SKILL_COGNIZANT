import React, { useState } from 'react';
import './App.css';
import CurrencyConvertor from './CurrencyConvertor';

function App() {
  const [count, setCount] = useState(0);

  // 1a. Increment counter
  const incrementCounter = () => {
    setCount(count + 1);
  };

  // 1b. Say Hello with static message
  const sayHello = () => {
    alert('Hello! Welcome to React Event Handling!');
  };

  // 1. Multiple methods - Increment button calls both incrementCounter and sayHello
  const handleIncrement = () => {
    incrementCounter();
    sayHello();
  };

  // Decrement counter
  const decrementCounter = () => {
    setCount(count - 1);
  };

  // 2. Function that takes an argument
  const sayWelcome = (message) => {
    alert(`Say ${message}`);
  };

  // 3. Synthetic event handler
  const handleSyntheticEvent = (event) => {
    alert('I was clicked');
    console.log('Synthetic Event:', event);
    console.log('Event type:', event.type);
  };

  return (
    <div className="App">
      <h1>React Event Handling Examples</h1>

      <div className="counter-section">
        <h2>Counter: {count}</h2>
        <button onClick={handleIncrement} className="btn">Increment</button>
        <button onClick={decrementCounter} className="btn">Decrement</button>
      </div>

      <div className="event-section">
        <button onClick={() => sayWelcome('welcome')} className="btn welcome-btn">
          Say Welcome
        </button>
        <button onClick={handleSyntheticEvent} className="btn synth-btn">
          Click on me
        </button>
      </div>

      <div className="converter-section">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;
