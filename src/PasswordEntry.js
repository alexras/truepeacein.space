import React, { Component } from 'react';
import './PasswordEntry.css';
import { gameStateToJSON, passwordStringToGameState } from './password-utils.js';

class PasswordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordString: 'JUSTINBAILEY------------',
      passwordBuffer: [],
      passwordJson: props.gameState,
      checksumOK: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="PasswordEntry">
        <input type="text" pattern="[A-Za-z0-9?\- ]{24}" maxLength="24" value={this.state.passwordString} onChange={this.handleChange} className={this.state.checksumOK ? "good" : "bad"}/>
        <div className="checksum">
          <span className="checksumChar hash">#</span>
        <span className={"checksumChar " + (this.state.checksumOK ? "good" : "bad")}>{this.state.checksumOK ? "✓" : "✗" }</span>
        </div>
      </div>
    );
  }

  handleChange(event) {
    var passwordString = event.target.value;
    this.setState({
      passwordString: passwordString
    });

    if (passwordString.length === 24) {
      var passwordBuffer;
      try {
        passwordBuffer = passwordStringToGameState(passwordString);
      } catch (err) {
        this.setState({
          checksumOK: false
        });
      }

      var gameStateJson = gameStateToJSON(passwordBuffer);
      this.setState({
        passwordBuffer: passwordBuffer,
        passwordJson: gameStateJson,
        checksumOK: true
      });

      this.props.onChange(gameStateJson);
    } else {
      this.setState({
        checksumOK: false
      });
    }
  }
}

        // <br/><input type="text" pattern="[A-Za-z0-9?\- ]{24}" value={this.state.passwordBuffer} onChange={this.handleChange} readOnly />
        // <br/><textarea value={JSON.stringify(this.state.passwordJson, null, '\t')} readOnly/>


export default PasswordEntry;
