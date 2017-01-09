import BitBuffer from './BitBuffer';

export function testClassWithSimpleProps(clazz, propToBitMap) {
  describe('accessor tests', () => {
    var buffer;
    var onChange;
    var instance;

    function testSet(propName, bufferBit) {
      it('set ' + propName, () => {
        expect(buffer.getBit(bufferBit)).toBe(false);
        instance[propName] = true;
        expect(buffer.getBit(bufferBit)).toBe(true);
        expect(onChange).toHaveBeenCalled();
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
      onChange = jest.fn();
      instance = new clazz(buffer, onChange);
    });

    Object.keys(propToBitMap).forEach(function(propName) {
      testSet(propName, propToBitMap[propName]);
      testGet(propName, propToBitMap[propName]);
    });
  });
}
