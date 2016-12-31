import React, { Component } from 'react';
import './PasswordEntry.css';
import { gameStateToJSON, passwordStringToGameState } from './password-utils.js';

class PasswordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordString: '',
      passwordBuffer: [],
      passwordJson: props.gameState
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="PasswordEntry">
        <input type="text" pattern="[A-Za-z0-9?\- ]{24}" value={this.state.passwordString} onChange={this.handleChange} />
        <br/><input type="text" pattern="[A-Za-z0-9?\- ]{24}" value={this.state.passwordBuffer} onChange={this.handleChange} readOnly />
        <br/><textarea value={JSON.stringify(this.state.passwordJson, null, '\t')} readOnly/>
      </div>
    );
  }

  handleChange(event) {
    var passwordString = event.target.value;
    this.setState({
      passwordString: passwordString
    });

    if (passwordString.length === 24) {
      var passwordBuffer = passwordStringToGameState(passwordString);
      var gameStateJson = gameStateToJSON(passwordBuffer);
      this.setState({
        passwordBuffer: passwordBuffer,
        passwordJson: gameStateJson
      });

      this.props.onChange(gameStateJson);
    }
  }
}

export default PasswordEntry;
