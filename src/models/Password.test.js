import Password from './Password';
import BitBuffer from './BitBuffer';

function checkPassword(passwordString, expectedBufferContents, expectedChecksumOK, expectedValid) {
  describe('"' + passwordString + '"', () => {
    var onChange;
    var password;

    beforeEach(() => {
      onChange = jest.fn();
      password = new Password(BitBuffer.newEmptyBuffer(), onChange);
      password.str = passwordString;
      expect(onChange).toHaveBeenCalled();
    });

    it('should produce the right game state', () => {
      var expectedBuffer = new Uint8Array(expectedBufferContents);

      expect(password._buffer.getBytes(0, 17)).toEqual(expectedBuffer);
    });

    it('should read the password properly', () => {
      expect(password.str).toEqual(passwordString);
    });

    it('should' + (expectedChecksumOK ? ' ' : ' not ') + 'have a valid checksum', () => {
      expect(password.checksumOK).toBe(expectedChecksumOK);
    });

    it('should ' + (expectedValid ? ' ' : ' not ') + 'be a valid password', () => {
      expect(password.valid).toBe(expectedValid);
    });
  });
}

checkPassword('000000000000000000000000',
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              true, true);

checkPassword('00000000000A00000000000A', [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10], true, false);

checkPassword('JUSTINBAILEY------------',
              [166, 243, 142, 164, 185, 101, 36, 169, 209, 127,
               255, 255, 255, 255, 255, 255, 255, 255], true, true);

checkPassword('bogusBOGUSbogusBOGUSbogu',
              [65, 231, 37, 202, 174, 54, 45, 132, 30, 114, 94, 92, 170, 227, 98, 216, 42, 184], false, false);

checkPassword('bogusBOGUSbogusBOGUSbohd',
              [65, 231, 37, 202, 174, 54, 45, 132, 30, 114, 94, 92, 170, 227, 98, 216, 42, 231], true, false);

// Morph ball is both inaccessible and not equipped
checkPassword('0G0000000000000000000001', [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], true, false);

// Morphball is equipped and inaccessible
checkPassword('0G000000000040000000000H', [1, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 17], true, true);
