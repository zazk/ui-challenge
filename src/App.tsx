import React from 'react';
import logo from './logo.svg';
import './App.css';

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          UI Engineer Position Take Home Challenge
        </p>
        <a
          className="App-link"
          href="https://doc.clickup.com/d/h/a0kg5-1183/8d71939ada06572"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the Exercise
        </a>
      </header>
    </div>
  );
}

export default App;
