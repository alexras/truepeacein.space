import BitBuffer from './BitBuffer';

export function testClassWithSimpleProps(clazz, propToBitMap) {
  describe('accessor tests', () => {
    var buffer;
    var instance;

    function testSet(propName, bufferBit) {
      it('set ' + propName, () => {
        expect(buffer.getBit(bufferBit)).toBe(false);
        instance[propName] = true;
        expect(buffer.getBit(bufferBit)).toBe(true);
      });
    }

    function testGet(propName, bufferBit) {
      it('get ' + propName, () => {
        expect(instance[propName]).toBe(false);
        buffer.setBit(bufferBit, true);
        expect(instance[propName]).toBe(true);
      });
    }

    beforeEach(() => {
      buffer = BitBuffer.newEmptyBuffer();
      instance = new clazz(buffer);
    });

    Object.keys(propToBitMap).forEach(function(propName) {
      testSet(propName, propToBitMap[propName]);
      testGet(propName, propToBitMap[propName]);
    });
  });
}
