import Items from './Items';
import BitBuffer from './BitBuffer';

describe('Item accessor tests', () => {
  var buffer;
  var items;

  function testWrite(area, itemType, key, bufferBit) {
    expect(buffer.getBit(bufferBit)).toBe(false);
    items[area][itemType][key] = true;
    expect(buffer.getBit(bufferBit)).toBe(true);
  }

  function testRead(area, itemType, key, bufferBit) {
    expect(items[area][itemType][key]).toBe(false);
    buffer.setBit(bufferBit, true);
    expect(items[area][itemType][key]).toBe(true);
  }

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    items = new Items(buffer);
  });

  describe('Brinstar', () => {
    it('should write missile container 0', () => {
      testWrite('brinstar', 'missileContainers', 0, 1);
    });

    it('should read missile container 1', () => {
      testRead('brinstar', 'missileContainers', 1, 8);
    });

    it('should write energy tank 1', () => {
      testWrite('brinstar', 'energyTanks', 1, 9);
    });

    it('should read energy tank 2', () => {
      testRead('brinstar', 'energyTanks', 2, 12);
    });

    it('should have the expected door names', () => {
      expect(Object.keys(items.brinstar.doors))
        .toEqual(['longBeam', 'tourianBridge', 'bombs', 'iceBeam', 'varia']);
    });

    it('should read the Tourian bridge door', () => {
      testRead('brinstar', 'doors', 'tourianBridge', 3);
    });

    it('should write the Long Beam door', () => {
      testWrite('brinstar', 'doors', 'longBeam', 2);
    });
  });

  describe('Norfair', () => {
    it('should read missile container 6', () => {
      testRead('norfair', 'missileContainers', 6, 20);
    });

    it('should write missile container 5', () => {
      testWrite('norfair', 'missileContainers', 5, 19);
    });
  });

  describe("Ridley's Lair", () => {
    it('should read energy tank 1', () => {
      testRead('ridley', 'energyTanks', 1, 48);
    });

    it('should write energy tank 0', () => {
      testWrite('ridley', 'energyTanks', 0, 45);
    });
  });

  describe("Kraid's Lair", () => {
    it('should read door "three"', () => {
      testRead('kraid', 'doors', 'three', 37);
    });

    it('should write door "four"', () => {
      testWrite('kraid', 'doors', 'four', 38);
    });
  });

  describe("Tourian", () => {
    it('should read zebetite 3', () => {
      testRead('tourian', 'zebetites', 3, 56);
    });

    it('should write zebetite 2', () => {
      testWrite('tourian', 'zebetites', 2, 55);
    });
  });
});
