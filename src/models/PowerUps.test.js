import BitBuffer from './BitBuffer';
import PowerUps from './PowerUps';

describe('PowerUps accessor tests', () => {
  var buffer;
  var powerups;


  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    powerups = new PowerUps(buffer);
  });

  it('should set morphball to equipped', () => {
    expect(buffer.getBit(76)).toBe(false);
    powerups.morphball.equipped = true;
    expect(buffer.getBit(76)).toBe(true);
  });

  it('should get equipped state of long beam', () => {
    expect(powerups.longbeam.equipped).toBe(false);
    buffer.setBit(74, true);
    expect(powerups.longbeam.equipped).toBe(true);
  });

  it('should set varia suit to taken', () => {
    expect(buffer.getBit(11)).toBe(false);
    powerups.variasuit.taken = true;
    expect(buffer.getBit(11)).toBe(true);
  });

  it('should get taken state for bombs', () => {
    expect(powerups.bombs.taken).toBe(false);
    buffer.setBit(6, true);
    expect(powerups.bombs.taken).toBe(true);
  });

  it('should throw when asked for taken state of wave beam', () => {
    expect(() => {
      powerups.icebeam.taken = true;
    }).toThrowError(/does not have a/);
  });
});
