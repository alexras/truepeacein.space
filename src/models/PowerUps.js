class PowerUp {
  constructor(buffer, equippedIndex, takenIndex) {
    this._buffer = buffer;
    this._equippedIndex = equippedIndex;
    this._takenIndex = takenIndex;
  }

  get taken() {
    if (this._takenIndex) {
      return this._buffer.getBit(this._takenIndex);
    } else {
      return null;
    }
  }

  set taken(isTaken) {
    if (this._takenIndex) {
      this._buffer.setBit(this._takenIndex, isTaken);
    } else {
      throw new Error('Powerup does not have a "taken" flag to set');
    }
  }

  get equipped() {
    return this._buffer.getBit(this._equippedIndex);
  }

  set equipped(isEquipped) {
    this._buffer.setBit(this._equippedIndex, isEquipped);
  }
}

class PowerUps {
  constructor(buffer) {
    this.morphball = new PowerUp(buffer, 76, 0);
    this.bombs = new PowerUp(buffer, 72, 6);
    this.longbeam = new PowerUp(buffer, 74);
    this.wavebeam = new PowerUp(buffer, 78);
    this.icebeam = new PowerUp(buffer, 79);
    this.screwattack = new PowerUp(buffer, 75, 26);
    this.variasuit = new PowerUp(buffer, 77, 11);
    this.hijumpboots = new PowerUp(buffer, 73, 24);
  }
}

export default PowerUps;
