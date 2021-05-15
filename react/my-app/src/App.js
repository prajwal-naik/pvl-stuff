import logo from './logo.svg';
import ReactDOM from 'react-dom';
import Timer from './timerComponent'
import './App.css';
import React from 'react';
import Toggler from './toggleComponent'
import Greetings from './conditionalRender'
import Calculator from './calculatorComponent'
import LoginModule from './loginComponent'
import Example from './countHooker'


function ReactAnimation() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> 
  );  


}

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>

  //   </div>
    
  // );
  return (
    <div>
      <ReactAnimation></ReactAnimation>
      <Timer></Timer>
      {/* <Toggler></Toggler>
      <Greetings isLoggedIn={true}></Greetings> */}
      <LoginModule></LoginModule>
      <Calculator></Calculator>
      <Example></Example>
    </div>
  );
}

export default App;
