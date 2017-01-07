var RIDLEY_BIT = 125;
var KRAID_BIT = 127;

class MinibossStatueState {
  constructor(buffer) {
    this._buffer = buffer;
  }

  get ridley() {
    return this._buffer.getBit(RIDLEY_BIT);
  }

  set ridley(isRaised) {
    this._buffer.setBit(RIDLEY_BIT, isRaised);
  }

  get kraid() {
    return this._buffer.getBit(KRAID_BIT);
  }

  set kraid(isRaised) {
    this._buffer.setBit(KRAID_BIT, isRaised);
  }
};

export default MinibossStatueState;
