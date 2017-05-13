import BitBuffer from './BitBuffer';

var PASSWORD_SIZE_BYTES = 18;

var METROID_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?-';

// Convert characters to "Metroid Alphabet" (0-63 + 255)
function passwordStringToMetroidAlphabet(passwordString) {
  var passwordBytes = [];

  for (var i = 0; i < passwordString.length; i++) {
    var currentChar = passwordString.charAt(i);

    if (currentChar === ' ') {
      passwordBytes.push(255);
    } else {
      var metroidAlphaChar = METROID_ALPHABET.indexOf(currentChar);

      if (metroidAlphaChar === -1) {
        throw new Error('Invalid character "' + currentChar + '" at position "' + i + '" in password string');
      } else {
        passwordBytes.push(metroidAlphaChar);
      }
    }
  }

  return passwordBytes;
}

function metroidAlphabetCharsToPasswordString(metroidAlphaChars) {
  var passwordString = [];

  for (var i = 0; i < metroidAlphaChars.length; i++) {
    var currentChar = metroidAlphaChars[i];

    if (currentChar === 255) {
      passwordString.push(' ');
    } else if (currentChar < 0 || currentChar > 63) {
      throw new Error('Invalid Metroid alphabet character ' + currentChar + ' at position ' + i);
    } else {
      passwordString.push(METROID_ALPHABET.charAt(currentChar));
    }
  }

  return passwordString.join('');
}

function passwordCharactersToGameStateBytes(passwordBytes) {
  var passwordBlocks = [];

  for (var i = 0; i < 6; i++) {
    var startIndex = i * 4;
    passwordBlocks.push((passwordBytes[startIndex] << 2) | (passwordBytes[startIndex + 1] >> 4));
    passwordBlocks.push((passwordBytes[startIndex + 1] << 4) | (passwordBytes[startIndex + 2] >> 2));
    passwordBlocks.push((passwordBytes[startIndex + 2] << 6) | (passwordBytes[startIndex + 3]));
  }

  return new Uint8Array(passwordBlocks);
}

function gameStateBytesToPasswordCharacters(passwordBlocks) {
  var passwordBytes = [];

  for (var i = 0; i < 6; i++) {
    var startIndex = i * 3;
    passwordBytes.push(passwordBlocks[startIndex] >> 2);
    passwordBytes.push(((passwordBlocks[startIndex] & 0x3) << 4) | (passwordBlocks[startIndex + 1] >> 4));
    passwordBytes.push(((passwordBlocks[startIndex + 1] & 0xf) << 2) | (passwordBlocks[startIndex + 2] >> 6));
    passwordBytes.push(passwordBlocks[startIndex + 2] & 0x3f);
  }

  return passwordBytes;
}

class Password {
  constructor(buffer, onChange) {
    this._buffer = buffer;
    this._onChange = onChange;
  }

  get str() {
    var bufferCopy = BitBuffer.copy(this._buffer);
    bufferCopy.rotateRight();
    var metroidAlphaChars = gameStateBytesToPasswordCharacters(bufferCopy.getBytes(0, PASSWORD_SIZE_BYTES - 1));
    return metroidAlphabetCharsToPasswordString(metroidAlphaChars);
  }

  set str(newPassword) {
    var metroidAlphaChars = passwordStringToMetroidAlphabet(newPassword);
    this._buffer.setBytes(0, PASSWORD_SIZE_BYTES - 1, passwordCharactersToGameStateBytes(metroidAlphaChars));
    this._buffer.rotateLeft();
    this._onChange();
  }

  get checksumOK() {
    try {
      this._buffer.validateChecksum();
      return true;
    } catch (err) {
      return false;
    }
  }

  fixChecksum(signalChange = true) {
    this._buffer.fixChecksum();
    if (signalChange) {
      this._onChange();
    }
  }

  get valid() {
    return this._buffer.getBit(67) === false;
  }
};

export default Password;
