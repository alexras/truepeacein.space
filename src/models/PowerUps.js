class PowerUp {
  constructor(buffer, onChange, equippedIndex, takenIndex) {
    this._buffer = buffer;
    this._equippedIndex = equippedIndex;
    this._takenIndex = takenIndex;
    this._onChange = onChange;
  }

  get taken() {
    if (typeof(this._takenIndex) !== 'undefined') {
      return this._buffer.getBit(this._takenIndex);
    } else {
      return null;
    }
  }

  set taken(isTaken) {
    if (typeof(this._takenIndex) !== 'undefined') {
      this._buffer.setBit(this._takenIndex, isTaken);
      this._onChange();
    } else {
      throw new Error('Powerup does not have a "taken" flag to set');
    }
  }

  get equipped() {
    return this._buffer.getBit(this._equippedIndex);
  }

  set equipped(isEquipped) {
    this._buffer.setBit(this._equippedIndex, isEquipped);
    this._onChange();
  }
}

class PowerUps {
  constructor(buffer, onChange) {
    this.morphball = new PowerUp(buffer, onChange, 76, 0);
    this.bombs = new PowerUp(buffer, onChange, 72, 6);
    this.longbeam = new PowerUp(buffer, onChange, 74);
    this.wavebeam = new PowerUp(buffer, onChange, 78);
    this.icebeam = new PowerUp(buffer, onChange, 79);
    this.screwattack = new PowerUp(buffer, onChange, 75, 26);
    this.variasuit = new PowerUp(buffer, onChange, 77, 11);
    this.hijumpboots = new PowerUp(buffer, onChange, 73, 24);
  }
}

export default PowerUps;
