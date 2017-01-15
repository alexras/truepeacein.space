import React, { Component } from 'react';
import './App.css';
import './fonts.css';
import { default as GameStateView } from './GameState';
import PasswordEntry from './PasswordEntry';

import BitBuffer from '../models/BitBuffer';
import GameState from '../models/GameState';
import Password from '../models/Password';

class App extends Component {
  constructor(props) {
    super(props);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    var buffer = BitBuffer.newEmptyBuffer();
    var gameState = new GameState(buffer, this.handlePasswordChange);
    var password = new Password(buffer, this.handlePasswordChange);

    this.state = {
      gameState: gameState,
      password: password
    };


  }

  handlePasswordChange() {
    const password = this.state.password;
    const gameState = this.state.gameState;

    password.fixChecksum(false);

    this.setState({
      gameState: gameState,
      password: password
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="headerText">
            <h2 className="password-uppercase">TRUEPEACEIN.SPACE</h2>
            <h3 className="password-lowercase">metroid password tool</h3>
          </div>
        </div>
        <PasswordEntry password={this.state.password} />
        <GameStateView gameState={this.state.gameState} />
        <div className="footer">
          <p>Written by <a href="http://www.alexras.info/">alexras</a> | Source on <a href="https://www.github.com/alexras/truepeacein.space">GitHub</a> | Metroid copyright Nintendo</p>
        </div>
      </div>
    );
  }
}

export default App;
