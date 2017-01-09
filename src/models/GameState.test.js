import BitBuffer from './BitBuffer';
import GameState from './GameState';

describe('missiles', () => {
  var buffer;
  var gameState;
  var onChange;

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    onChange = jest.fn();
    gameState = new GameState(buffer, onChange);
  });

  it('should initialize with 0 missiles', () => {
    expect(gameState.missiles).toBe(0);
  });

  it('should read missile count properly', () => {
    buffer.setByte(10, 47);
    expect(gameState.missiles).toBe(47);
  });

  it('should write missile count properly', () => {
    gameState.missiles = 163;
    expect(buffer.getByte(10)).toBe(163);
    expect(onChange).toHaveBeenCalled();
  });

  it('should throw if missile count is negative', () => {
    expect(() => {
      gameState.missiles = -12;
    }).toThrowError(/cannot be negative/);
  });

  it('should throw if missile count is greater than 255', () => {
    expect(() => {
      gameState.missiles = 9001;
    }).toThrowError(/cannot exceed 255/);
  });
});

describe('startLocation', () => {
  var buffer;
  var gameState;
  var onChange;

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    onChange = jest.fn();
    gameState = new GameState(buffer, onChange);
  });

  function testSetLocation(locationName, expectedBitState) {
    expect(buffer.getBits([64, 65, 66])).toEqual([false, false, false]);
    gameState.startLocation = locationName;
    expect(buffer.getBits([64, 65, 66])).toEqual(expectedBitState);
    expect(onChange).toHaveBeenCalled();
  }

  function testGetLocation(expectedLocationName, bitState) {
    buffer.setBits([64, 65, 66], bitState);
    expect(gameState.startLocation).toEqual(expectedLocationName);
  }

  it('should set bits properly for Brinstar', () => {
    testSetLocation('brinstar', [false, false, false]);
  });

  it('should set bits properly for Norfair', () => {
    testSetLocation('norfair', [true, false, false]);
  });

  it('should set bits properly for Tourian', () => {
    testSetLocation('tourian', [true, true, false]);
  });

  it('should set bits properly for Kraid', () => {
    testSetLocation('kraidsLair', [false, true, false]);
  });

  it('should set bits properly for Ridley', () => {
    testSetLocation('ridleysLair', [false, false, true]);
  });

  it('should properly recognize Brinstar', () => {
    testGetLocation('brinstar', [false, false, false]);
  });

  it('should properly recognize Norfair', () => {
    testGetLocation('norfair', [true, false, false]);
  });

  it('should properly recognize Tourian', () => {
    testGetLocation('tourian', [true, true, false]);
  });

  it('should properly recognize Kraid', () => {
    testGetLocation('kraidsLair', [false, true, false]);
  });

  it('should properly recognize Ridley', () => {
    testGetLocation('ridleysLair', [false, false, true]);
  });

  it('should throw with an invalid start location', () => {
    expect(() => {
      gameState.startLocation = 'secretCowLevel';
    }).toThrowError(/Invalid start location/);
  });
});

it('should read the reset bit', () => {
  var buffer = BitBuffer.newEmptyBuffer();

  var gameState = new GameState(buffer);

  expect(gameState.reset).toBe(false);
  buffer.setBit(67, true);
  expect(gameState.reset).toBe(true);
});

describe('swimsuit', () => {
  var buffer;
  var onChange;
  var gameState;

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    onChange = jest.fn();
    gameState = new GameState(buffer, onChange);
  });

  it('should read correct swimsuit state', () => {
    expect(gameState.swimsuit).toBe(false);
    buffer.setBit(71, true);
    expect(gameState.swimsuit).toBe(true);
  });

  it('should modify swimsuit state', () => {
    expect(buffer.getBit(71)).toBe(false);
    gameState.swimsuit = true;
    expect(buffer.getBit(71)).toBe(true);
    expect(onChange).toHaveBeenCalled();
  });
});
