import React, { Component } from 'react';
import './PasswordEntry.css';
import { gameStateToJSON, passwordStringToGameState, gameStateToPasswordString, fixChecksum, validateChecksum } from './password-utils.js';

class PasswordEntry extends Component {
  constructor(props) {
    super(props);
    var initialPassword = 'JUSTINBAILEY------------';

    this.state = {
      passwordString: initialPassword,
      passwordBuffer: passwordStringToGameState(initialPassword),
      passwordJson: props.gameState,
      checksumOK: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickChecksumFix = this.handleClickChecksumFix.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
  }

  render() {
    return (
      <div className="PasswordEntry">
        <input type="text" pattern="[A-Za-z0-9?\- ]{24}" maxLength="24" value={this.state.passwordString} onChange={this.handleChange} className={this.state.checksumOK ? "good" : "bad"}/>
        <div className="checksum" onClick={this.handleClickChecksumFix}>
          <span className="checksumChar hash">#</span>
        <span className={"checksumChar " + (this.state.checksumOK ? "good" : "bad")}>{this.state.checksumOK ? "✓" : "✗" }</span>
        </div>
      </div>
    );
  }

  handleClickChecksumFix(event) {
    if (!(this.state.checksumOK)) {
      // Copy the buffer so that fixing the checksum doesn't modify state outside of setState
      var passwordBuffer = this.state.passwordBuffer.slice(0);
      fixChecksum(passwordBuffer);

      var passwordString = gameStateToPasswordString(passwordBuffer);
      var gameStateJson = gameStateToJSON(passwordBuffer);

      this.setState({
        passwordString: passwordString,
        passwordBuffer: passwordBuffer,
        passwordJson: gameStateJson,
        checksumOK: true
      });

      this.props.onChange(gameStateJson);
    }
  }

  handleNewPassword(passwordString) {
    var passwordBuffer = passwordStringToGameState(passwordString);

    this.setState({
      passwordString: passwordString,
      passwordBuffer: passwordBuffer
    });

    // Validate checksum
    try {
      validateChecksum(passwordBuffer);

      var gameStateJson = gameStateToJSON(passwordBuffer);
      this.setState({
        passwordJson: gameStateJson,
        checksumOK: true
      });

      this.props.onChange(gameStateJson);
    } catch (err) {
      this.setState({
        checksumOK: false
      });
    }
  }

  handleChange(event) {
    var passwordString = event.target.value;
    this.setState({
      passwordString: passwordString
    });

    if (passwordString.length === 24) {
      this.handleNewPassword(passwordString);
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
