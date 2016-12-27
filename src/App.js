import React, { Component } from 'react';
import './App.css';
import './fonts.css';
import GameState from './GameState';
import PasswordEntry from './PasswordEntry';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="password-uppercase">NARPASSWORD</h2>
          <h3 className="password-lowercase">metroid password generator</h3>
        </div>
        <PasswordEntry />
        <GameState />
      </div>
    );
  }
}

export default App;
