import React, { Component } from 'react';
import './PasswordEntry.css';

var MISSILE_COUNT_BLOCK = 10;
var GAME_AGE_START_BYTE = 11;
var GAME_AGE_END_BYTE = 14;
var SHIFT_BYTE = 16;
var CHECKSUM_BYTE = 17;

var EMPTY_BLOCKS = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// Convert characters to "Metroid Alphabet" (0-63 + 255)
function passwordStringToMetroidAlphabet(passwordString) {
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

  return passwordBytes;
}

function passwordBytesToBlocks(passwordBytes) {
  var passwordBlocks = [];

  var i = 0;
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

  return new Uint8Array(passwordBlocks);
}

// Note to self; this comes from GPLv3 code (mpg v1.0a), so we'll have to set the license accordingly
function rotateLeft(passwordBlocks) {
  var carry = 1;
  var carryTemp;
  var rotateAmount = passwordBlocks[SHIFT_BYTE];

  console.log('Rotating left by ' + rotateAmount + ' bits');

  for (var i = 0; i < rotateAmount; i++) {
    var temp = passwordBlocks[15];

    for (var j = 15; j >= 0; j--) {
      carryTemp = (passwordBlocks[j] & 0x80) >> 7;
      passwordBlocks[j] = (passwordBlocks[j] << 1) | (carry & 0x1);
      carry = carryTemp;
    }

    carryTemp = (temp & 0x80) >> 7;
    temp = (temp << 1) | (carry & 0x1);
    carry = carryTemp;

    passwordBlocks[15] = temp;
  }
}

function validateChecksum(passwordBlocks) {
  var checksum = 0;

  for (var i = 16; i >= 0; i--) {
    checksum = (checksum + passwordBlocks[i]) % 256;
  }

  if (checksum !== passwordBlocks[CHECKSUM_BYTE]) {
    throw new Error("Expected checksum (" + checksum.toString(2) + ") to match password's checksum byte (" + passwordBlocks[CHECKSUM_BYTE].toString(2) + ")");
  }
}

function passwordStringToBuffer(passwordString) {
  var passwordBytes = passwordStringToMetroidAlphabet(passwordString);

  // Now we have to compress the 24-byte password into 18 bytes.
  var passwordBlocks = passwordBytesToBlocks(passwordBytes);

  // Use the shift byte to decode the password data
  rotateLeft(passwordBlocks);

  // Validate checksum
  validateChecksum(passwordBlocks);

  return passwordBlocks;
}

function getBoolFromBlock(block, position) {
  var maskBit = 7 - position;
  var mask = 2 ** maskBit;

  return Boolean((block & mask) >> maskBit);
}

function passwordBlocksToGameStateJSON(passwordBlocks) {
  function b(bit) {
    var block = Math.floor(bit / 8);
    var position = 7 - (bit % 8);

    return getBoolFromBlock(passwordBlocks[block], position);
  }

  var gameAgeInTicks = 0;

  for (var i = GAME_AGE_START_BYTE; i <= GAME_AGE_END_BYTE; i++) {
    gameAgeInTicks += passwordBlocks[i];
    gameAgeInTicks = gameAgeInTicks << 8;
  }

  var missiles = passwordBlocks[MISSILE_COUNT_BLOCK];

  // TODO: can't pick up ice beam and wave beam simultaneously

  return {
    powerups: {
      morphball: {
        taken: b(0),
        equipped: b(76)
      },
      bombs: {
        taken: b(6),
        equipped: b(72)
      },
      longbeam: {
        equipped: b(74)
      },
      wavebeam: {
        equipped: b(78)
      },
      icebeam: {
        equipped: b(79)
      },
      screwattack: {
        taken: b(26),
        equipped: b(75)
      },
      variasuit: {
        taken: b(11),
        equipped: b(77)
      },
      hijumpboots: {
        taken: b(24),
        equipped: b(73)
      }
    },
    items: {
      brinstar: {
        missileContainers: [b(1), b(8)],
        energyTanks: [b(4), b(9), b(12)],
        doors: {
          longBeam: b(2),
          tourianBridge: b(3),
          bombs: b(5),
          iceBeam: b(7),
          varia: b(10)
        }
      },
      tourian: {
        doors: {
          one: b(50),
          two: b(51),
          three: b(52)
        },
        zebetites: [b(53), b(54), b(55), b(56), b(57)]
      },
      norfair: {
        missileContainers: [b(13), b(14), b(16), b(17), b(18), b(19), b(20), b(21), b(22), b(27), b(28), b(31)],
        energyTanks: [b(30)],
        doors: {
          hiJumpBoots: b(23),
          screwAttack: b(25),
          waveBeam: b(29),
          iceBeam: b(15)
        }
      },
      ridley: {
        missileContainers: [b(43), b(46), b(49)],
        energyTanks: [b(45), b(48)],
        doors: {
          one: b(44),
          ridleysRoom: b(47)
        }
      },
      kraid: {
        missileContainers: [b(33), b(34), b(39), b(40)],
        energyTanks: [b(36), b(42)],
        doors: {
          one: b(32),
          two: b(35),
          three: b(37),
          four: b(38),
          kraidsRoom: b(41)
        }
      }
    },
    missiles: missiles,
    bossesKilled: {
      motherBrain: b(58),
      ridley: b(124),
      kraid: b(126)
    },
    // TODO: if all three are false, Brinstar is selected
    startLocation: {
      norfair: b(64),
      kraidsLair: b(65),
      ridleysLair: b(66)
    },
    // Reset bit guarantees an invalid password
    reset: b(67),
    swimsuit: b(71),
    statuesRaised: {
      ridley: b(125),
      kraid: b(127)
    }
  };
}

class PasswordEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordString: '',
      passwordBuffer: [],
      passwordJson: passwordBlocksToGameStateJSON(EMPTY_BLOCKS)
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
    this.setState({
      passwordString: event.target.value
    });

    if (event.target.value.length === 24) {
      var passwordBuffer = passwordStringToBuffer(event.target.value);
      var passwordJson = passwordBlocksToGameStateJSON(passwordBuffer);

      this.setState({
        passwordBuffer: passwordBuffer,
        passwordJson: passwordJson
      });
    }
  }
}

export default PasswordEntry;
