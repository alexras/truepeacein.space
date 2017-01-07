var MOTHER_BRAIN_BIT = 58;
var RIDLEY_BIT = 124;
var KRAID_BIT = 126;

class BossesKilled {
  constructor(buffer) {
    this._buffer = buffer;
  }

  get motherBrain() {
    return this._buffer.getBit(MOTHER_BRAIN_BIT);
  }

  set motherBrain(isAlive) {
    this._buffer.setBit(MOTHER_BRAIN_BIT, isAlive);
  }

  get ridley() {
    return this._buffer.getBit(RIDLEY_BIT);
  }

  set ridley(isAlive) {
    this._buffer.setBit(RIDLEY_BIT, isAlive);
  }

  get kraid() {
    return this._buffer.getBit(KRAID_BIT);
  }

  set kraid(isAlive) {
    this._buffer.setBit(KRAID_BIT, isAlive);
  }
};

export default BossesKilled;
