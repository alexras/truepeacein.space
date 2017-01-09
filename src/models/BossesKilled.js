var MOTHER_BRAIN_BIT = 58;
var RIDLEY_BIT = 124;
var KRAID_BIT = 126;

class BossesKilled {
  constructor(buffer, onChange) {
    this._buffer = buffer;
    this._onChange = onChange;
  }

  get motherBrain() {
    return this._buffer.getBit(MOTHER_BRAIN_BIT);
  }

  set motherBrain(isAlive) {
    this._buffer.setBit(MOTHER_BRAIN_BIT, isAlive);
    this._onChange();
  }

  get ridley() {
    return this._buffer.getBit(RIDLEY_BIT);
  }

  set ridley(isAlive) {
    this._buffer.setBit(RIDLEY_BIT, isAlive);
    this._onChange();
  }

  get kraid() {
    return this._buffer.getBit(KRAID_BIT);
  }

  set kraid(isAlive) {
    this._buffer.setBit(KRAID_BIT, isAlive);
    this._onChange();
  }
};

export default BossesKilled;
