import Items from './Items';
import PowerUps from './PowerUps';
import BossesKilled from './BossesKilled';
import MinibossStatueState from './MinibossStatueState';
import GameAge from './GameAge';

var MISSILE_COUNT_BYTE = 10;

var START_IN_NORFAIR_BIT = 64;
var START_IN_KRAID_BIT = 65;
var START_IN_RIDLEY_BIT = 66;
var RESET_BIT = 67;
var SWIMSUIT_BIT = 71;

var START_LOCATION_BRINSTAR = 'brinstar';
var START_LOCATION_NORFAIR = 'norfair';
var START_LOCATION_KRAID = 'kraidsLair';
var START_LOCATION_RIDLEY = 'ridleysLair';
var START_LOCATION_TOURIAN = 'tourian';

var VALID_START_LOCATIONS = [
  START_LOCATION_BRINSTAR,
  START_LOCATION_NORFAIR,
  START_LOCATION_KRAID,
  START_LOCATION_RIDLEY,
  START_LOCATION_TOURIAN
];

class GameState {
  constructor(buffer) {
    this._buffer = buffer;
    this.powerups = new PowerUps(buffer);
    this.items = new Items(buffer);
    this.bossesKilled = new BossesKilled();
    this.statuesRaised = new MinibossStatueState();
    this.gameAge = new GameAge(buffer);
  }

  get missiles() {
    return this._buffer.getByte(MISSILE_COUNT_BYTE);
  }

  set missiles(missileCount) {
    if (missileCount < 0) {
      throw new Error('Missile count cannot be negative');
    }

    if (missileCount > 255) {
      throw new Error('Missile count cannot exceed 255');
    }

    this._buffer.setByte(MISSILE_COUNT_BYTE, missileCount);
  }

  get startLocation() {
    if (this._buffer.getBit(START_IN_NORFAIR_BIT)) {
      if (this._buffer.getBit(START_IN_KRAID_BIT)) {
        return START_LOCATION_TOURIAN;
      } else {
        return START_LOCATION_NORFAIR;
      }
    } else if (this._buffer.getBit(START_IN_KRAID_BIT)) {
      return START_LOCATION_KRAID;
    } else if (this._buffer.getBit(START_IN_RIDLEY_BIT)) {
      return START_LOCATION_RIDLEY;
    } else {
      return START_LOCATION_BRINSTAR;
    }
  }

  set startLocation(location) {
    var bitsToSet = [START_IN_NORFAIR_BIT, START_IN_KRAID_BIT, START_IN_RIDLEY_BIT];

    switch (location) {
      case START_LOCATION_BRINSTAR:
        this._buffer.setBits(bitsToSet, [false, false, false]);
        break;
      case START_LOCATION_NORFAIR:
        this._buffer.setBits(bitsToSet, [true, false, false]);
        break;
      case START_LOCATION_KRAID:
        this._buffer.setBits(bitsToSet, [false, true, false]);
        break;
      case START_LOCATION_RIDLEY:
        this._buffer.setBits(bitsToSet, [false, false, true]);
        break;
      case START_LOCATION_TOURIAN:
        this._buffer.setBits(bitsToSet, [true, true, false]);
        break;
      default:
        throw new Error('Invalid start location "' + location + '"');
        break;
    }
  }

  get reset() {
    return this._buffer.getBit(RESET_BIT);
  }

  get swimsuit() {
    return this._buffer.getBit(SWIMSUIT_BIT);
  }

  set swimsuit(swimsuitOn) {
    this._buffer.setBit(SWIMSUIT_BIT, true);
  }
}

export default GameState;
