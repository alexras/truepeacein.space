var RIDLEY_BIT = 125;
var KRAID_BIT = 127;

class MinibossStatueState {
  constructor(buffer, onChange) {
    this._buffer = buffer;
    this._onChange = onChange;
  }

  get ridley() {
    return this._buffer.getBit(RIDLEY_BIT);
  }

  set ridley(isRaised) {
    this._buffer.setBit(RIDLEY_BIT, isRaised);
    this._onChange();
  }

  get kraid() {
    return this._buffer.getBit(KRAID_BIT);
  }

  set kraid(isRaised) {
    this._buffer.setBit(KRAID_BIT, isRaised);
    this._onChange();
  }
};

export default MinibossStatueState;
