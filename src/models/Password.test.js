import Password from './Password';
import BitBuffer from './BitBuffer';

function checkPassword(passwordString, expectedBufferContents, expectedChecksumOK) {
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
  });
}

checkPassword('000000000000000000000000',
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              true);

checkPassword('JUSTINBAILEY------------',
              [166, 243, 142, 164, 185, 101, 36, 169, 209, 127,
               255, 255, 255, 255, 255, 255, 255, 255], true);

checkPassword('bogusBOGUSbogusBOGUSbogu',
              [65, 231, 37, 202, 174, 54, 45, 132, 30, 114, 94, 92, 170, 227, 98, 216, 42, 184], false);

checkPassword('bogusBOGUSbogusBOGUSbohd',
              [65, 231, 37, 202, 174, 54, 45, 132, 30, 114, 94, 92, 170, 227, 98, 216, 42, 231], true);
