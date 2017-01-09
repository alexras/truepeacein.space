import Items from './Items';
import BitBuffer from './BitBuffer';

describe('Item accessor tests', () => {
  var buffer;
  var items;
  var onChange;

  function testWrite(area, itemType, key, bufferBit) {
    expect(buffer.getBit(bufferBit)).toBe(false);
    items[area][itemType][key] = true;
    expect(buffer.getBit(bufferBit)).toBe(true);
    expect(onChange).toHaveBeenCalled();
  }

  function testRead(area, itemType, key, bufferBit) {
    expect(items[area][itemType][key]).toBe(false);
    buffer.setBit(bufferBit, true);
    expect(items[area][itemType][key]).toBe(true);
  }

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    onChange = jest.fn();
    items = new Items(buffer, onChange);
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

    it('should be able to iterate through the missile containers', () => {
      var expectedIndex = 0;

      items.brinstar.missileContainers[1] = true;

      var itemCount = 0;

      items.brinstar.missileContainers.forEach((container, index) => {
        expect(container).toBe(items.brinstar.missileContainers[index]);
        expect(index).toBe(itemCount);
        itemCount++;
      });

      expect(itemCount).toBe(2);
    });

    it('should be able to iterate through the energy tanks', () => {
      var items = new Items(BitBuffer.newEmptyBuffer(), jest.fn());
      var expectedIndex = 0;

      items.brinstar.energyTanks[1] = true;
      items.brinstar.energyTanks[2] = true;

      var itemCount = 0;

      items.brinstar.energyTanks.forEach((container, index) => {
        expect(container).toBe(items.brinstar.energyTanks[index]);
        expect(index).toBe(itemCount);
        itemCount++;
      });

      expect(itemCount).toBe(3);
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

    it('should be able to iterate through the zebetites', () => {
      items.tourian.zebetites[2] = true;
      items.tourian.zebetites[4] = true;

      var itemCount = 0;
      items.tourian.zebetites.forEach((zebetite, index) => {
        expect(zebetite).toBe(items.tourian.zebetites[index]);
        expect(index).toBe(itemCount);
        itemCount++;
      });

      expect(itemCount).toBe(5);
    });
  });
});
