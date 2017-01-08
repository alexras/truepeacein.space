import BitBuffer from './BitBuffer';

describe('getBit', () => {
  it('should get bit 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x01]));

    expect(buf.getBit(0)).toBe(true);
    expect(buf.getBit(1)).toBe(false);
  });

  it('should get the last bit in byte 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x80]));

    expect(buf.getBit(6)).toBe(false);
    expect(buf.getBit(7)).toBe(true);
  });

  it('should get bit 3 of byte 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));

    expect(buf.getBit(2)).toBe(false);
    expect(buf.getBit(3)).toBe(true);
    expect(buf.getBit(4)).toBe(false);
  });

  it('should get bit 19 (bit 3 of byte 2)', () => {
    var buf = new BitBuffer(new Uint8Array([0, 0, 0x08]));

    expect(buf.getBit(18)).toBe(false);
    expect(buf.getBit(19)).toBe(true);
    expect(buf.getBit(20)).toBe(false);
  });

  it('should throw when its argument is out of bounds', () => {
    var buf = new BitBuffer(new Uint8Array([0, 0, 0x08]));

    expect(() => {
      buf.getBit(24);
    }).toThrowError(/out-of-bounds/);
  });

  it('should throw when its argument is not a number', () => {
    var buf = new BitBuffer(new Uint8Array([0, 0, 0x08]));

    expect(() => {
      buf.getBit('banana');
    }).toThrowError(/must be a number/);
  });

  it('should throw when its argument is null', () => {
    var buf = new BitBuffer(new Uint8Array([0]));
    expect(() => {
      buf.getBit(null);
    }).toThrowError(/Must provide/);
  });

  it('should throw when its argument is undefined', () => {
    var buf = new BitBuffer(new Uint8Array([0]));
    expect(() => {
      buf.getBit();
    }).toThrowError(/Must provide/);
  });
});

describe('setBit', () => {
  it('should set bit 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x80]));
    buf.setBit(0, true);
    expect(buf.getByte(0)).toBe(0x81);
  });

  it('should set the last bit in byte 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x60]));
    buf.setBit(7, true);
    expect(buf.getByte(0)).toBe(0xe0);
  });

  it('should set bit 3 of byte 0', () => {
    var buf = new BitBuffer(new Uint8Array([0x80]));
    buf.setBit(3, true);
    expect(buf.getByte(0)).toBe(0x88);
  });

  it('should be able a bit to false without disturbing the other bits', () => {
    var buf = new BitBuffer(new Uint8Array([0xad]));
    buf.setBit(3, false);
    expect(buf.getByte(0)).toBe(0xa5);
  });

  it('should set bit 19 (bit 3 of byte 2)', () => {
    var buf = new BitBuffer(new Uint8Array([0x60, 0, 0]));

    buf.setBit(19, true);
    expect(buf.getBytes(0, 2)).toEqual(new Uint8Array([0x60, 0, 0x08]));
  });

  it('should throw when its argument is out of bounds', () => {
    var buf = new BitBuffer(new Uint8Array([0, 0, 0x08]));

    expect(() => {
      buf.setBit(24);
    }).toThrowError(/out-of-bounds/);
  });

  it('should throw when its argument is not a number', () => {
    var buf = new BitBuffer(new Uint8Array([0, 0, 0x08]));

    expect(() => {
      buf.setBit('banana');
    }).toThrowError(/must be a number/);
  });

  it('should throw when its argument is undefined', () => {
    var buf = new BitBuffer(new Uint8Array([0]));

    expect(() => {
      buf.setBit();
    }).toThrowError(/Must provide/);
  });

  it('should throw when its argument is null', () => {
    var buf = new BitBuffer(new Uint8Array([0]));

    expect(() => {
      buf.setBit(null);
    }).toThrowError(/Must provide/);
  });
});

describe('getBits', () => {
  it('should get multiple bits that are defined in order', () => {
    var buf = new BitBuffer(new Uint8Array([0xad]));
    expect(buf.getBits([1, 2, 5])).toEqual([false, true, true]);
  });

  it('should get multiple bits that are defined out of order', () => {
    var buf = new BitBuffer(new Uint8Array([0xad]));
    expect(buf.getBits([5, 1, 2])).toEqual([true, false, true]);
  });

  it('should throw if the bits to get are not passed as an array', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));
    expect(() => {
      buf.getBits(24, [true]);
    }).toThrowError(/as an array/);
  });
});

describe('setBits', () => {
  it('should set multiple bits that are defined in order', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));

    buf.setBits([1, 3, 6], [true, false, true]);
    expect(buf.getByte(0)).toBe(0x42);
  });

  it('should set multiple bits that are defined out of order', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));

    buf.setBits([6, 1, 3], [true, true, false]);
    expect(buf.getByte(0)).toBe(0x42);
  });

  it('should throw if the number of bits and number of values are not the same', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));
    expect(() => {
      buf.setBits([6, 1, 3], [true, true]);
    }).toThrowError(/do not match/);
  });

  it('should throw if the bits to set are not passed as an array', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));
    expect(() => {
      buf.setBits(24, [true]);
    }).toThrowError(/as an array/);
  });

  it('should throw if bit values are not passed as an array', () => {
    var buf = new BitBuffer(new Uint8Array([0x08]));
    expect(() => {
      buf.setBits([24, 36], true);
    }).toThrowError(/as an array/);
  });
});

describe('getBytes', () => {
  var buf = new BitBuffer(new Uint8Array([0xa, 0xb, 0xc, 0xd]));

  it('should get one byte', () => {
    expect(buf.getBytes(2, 2)).toEqual(new Uint8Array([0xc]));
  });

  it('should get several bytes', () => {
    expect(buf.getBytes(1, 3)).toEqual(new Uint8Array([0xb, 0xc, 0xd]));
  });

  it('should throw if start byte is less than end byte', () => {
    expect(() => {
      buf.getBytes(1, 0);
    }).toThrowError(/must be greater-than or equal to/);
  });

  it('should throw if start byte is not a number', () => {
    expect(() => {
      buf.getBytes('banana', 7);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is null', () => {
    expect(() => {
      buf.getBytes(null, 7);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is undefined', () => {
    expect(() => {
      buf.getBytes(undefined, 7);
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is not a number', () => {
    expect(() => {
      buf.getBytes(3, 'banana');
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is null', () => {
    expect(() => {
      buf.getBytes(7, null);
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is undefined', () => {
    expect(() => {
      buf.getBytes(7);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is out-of-bounds', () => {
    expect(() => {
      buf.getBytes(10, 20);
    }).toThrowError(/out-of-bounds/);
  });

  it('should throw if end byte is out-of-bounds', () => {
    expect(() => {
      buf.getBytes(0, 50);
    }).toThrowError(/out-of-bounds/);
  });
});

describe('setBytes', () => {
  var buf;
  beforeEach(() => {
      buf = new BitBuffer(new Uint8Array([0xa, 0xb, 0xc, 0xd]));
  });

  it('should set one byte', () => {
    buf.setBytes(2, 2, [0xf]);
    expect(buf.getBytes(0, 3)).toEqual(new Uint8Array([0xa, 0xb, 0xf, 0xd]));
  });

  it('should set several bytes', () => {
    buf.setBytes(1, 3, [0xf, 0x1, 0x4]);
    expect(buf.getBytes(0, 3)).toEqual(new Uint8Array([0xa, 0xf, 0x1, 0x4]));
  });

  it('should throw if start byte is less than end byte', () => {
    expect(() => {
      buf.setBytes(1, 0, [0xf]);
    }).toThrowError(/must be greater-than or equal to/);
  });

  it('should throw if start byte is not a number', () => {
    expect(() => {
      buf.setBytes('banana', 7, [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is null', () => {
    expect(() => {
      buf.setBytes(null, 7, [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is undefined', () => {
    expect(() => {
      buf.setBytes(undefined, 7, [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is not a number', () => {
    expect(() => {
      buf.setBytes(3, 'banana', [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is null', () => {
    expect(() => {
      buf.setBytes(7, null, [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if end byte is undefined', () => {
    expect(() => {
      buf.setBytes(7, undefined, [0xf]);
    }).toThrowError(/must be a number/);
  });

  it('should throw if start byte is out-of-bounds', () => {
    expect(() => {
      buf.setBytes(10, 20, [0xf]);
    }).toThrowError(/out-of-bounds/);
  });

  it('should throw if end byte is out-of-bounds', () => {
    expect(() => {
      buf.setBytes(0, 50, [0xf]);
    }).toThrowError(/out-of-bounds/);
  });

  it('should throw if values are not passed in an array', () => {
    expect(() => {
      buf.setBytes(0, 0, 0xf);
    }).toThrowError(/as an array/);
  });

  it('should throw if too many values are passed', () => {
    expect(() => {
      buf.setBytes(0, 2, [0xf, 0xf, 0xf, 0xf]);
    }).toThrowError(/does not match byte range/);
  });

  it('should throw if too few values are passed', () => {
    expect(() => {
      buf.setBytes(0, 2, [0xf, 0xf]);
    }).toThrowError(/does not match byte range/);
  });

  it('should throw if values passed are not numbers', () => {
    expect(() => {
      buf.setBytes(0, 1, [0xf, 'banana']);
    }).toThrowError(/must be numbers/);
  });
});
