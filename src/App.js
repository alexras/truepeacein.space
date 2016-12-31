import React, { Component } from 'react';
import './App.css';
import './fonts.css';
import GameState from './GameState';
import PasswordEntry from './PasswordEntry';

import { newEmptyGameStateJSON } from './password-utils.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: newEmptyGameStateJSON()
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(newGameState) {
    this.setState({
      gameState: newGameState
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="password-uppercase">NARPASSWORD</h2>
          <h3 className="password-lowercase">metroid password generator</h3>
        </div>
        <PasswordEntry onChange={this.handlePasswordChange} />
        <GameState gameState={this.state.gameState} />
      </div>
    );
  }
}

export default App;
