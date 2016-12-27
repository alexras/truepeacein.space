import React, { Component } from 'react';
import './PasswordEntry.css';

function passwordStringToBuffer(passwordString) {
  // Convert characters to "Metroid Alphabet" (0-63 + 255)
  var passwordBytes = [];

  for (var i = 0; i < passwordString.length; i++) {
    var currentCharCode = passwordString.charCodeAt(i);

    if (currentCharCode === 32) {
      // Spaces are encoded as 255
      passwordBytes.push(255);
    } else if (currentCharCode >= 48 && currentCharCode <= 57) {
      // Characters 0 to 9 come first, getting the byte values 0-9
      passwordBytes.push(currentCharCode - 48);
    } else if (currentCharCode >= 65 && currentCharCode <= 90) {
      // Next comes A-Z, with values 10-35
      passwordBytes.push(currentCharCode - 55);
    } else if (currentCharCode >= 97 && currentCharCode <= 122) {
      // Then comes a-z, with values 36-61
      passwordBytes.push(currentCharCode - 61);
    } else if (currentCharCode === 63) {
      // Finally come ? and -, with values 62 and 63
      passwordBytes.push(62);
    } else if (currentCharCode === 45) {
      passwordBytes.push(63);
    } else {
      throw new Error('Invalid character code "' + currentCharCode + '" at position "' + i + '" in password string');
    }
  }

  // To make the subsequent math easier, account for spaces now by turning on
  // the low two bits of any character that precedes a space, and treating
  // spaces like dashes afterwards

  passwordBytes.forEach(function(passwordByte, index) {
    if (passwordByte === 255 && index > 0) {
      passwordBytes[index - 1] = passwordBytes[index - 1] | 0x03;
      passwordBytes[index] = 63;
    }
  });

  // Now we have to compress the 24-byte password into 18 bytes.
  var passwordBlocks = [];

  i = 0;

  var j = 0;
  var bitOffsets = [2, 4, 6];

  while (i < passwordBytes.length - 1) {
    var nextBlockHighBitCount = bitOffsets[j % 3];
    var currentBlockLowBitCount = 8 - nextBlockHighBitCount;

    var currentBlockLowBits = passwordBytes[i] << (8 - currentBlockLowBitCount);
    var nextBlockHighBits = passwordBytes[i + 1] >> (6 - nextBlockHighBitCount);

    passwordBlocks.push(currentBlockLowBits | nextBlockHighBits);

    if (nextBlockHighBitCount === 6) {
      i += 2;
    } else {
      i++;
    }
    j++;
  }

  return passwordBlocks;
}

class PasswordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordString: '',
      passwordBuffer: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="PasswordEntry">
        <input type="text" pattern="[A-Za-z0-9?\- ]{24}" value={this.state.passwordString} onChange={this.handleChange} />
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      passwordString: event.target.value
    });

    if (event.target.value.length === 24) {
      this.setState({
        passwordBuffer: passwordStringToBuffer(event.target.value)
      });
    }
  }
}

export default PasswordEntry;
