import Items from './Items';
import PowerUps from './PowerUps';
import BossesKilled from './BossesKilled';
import MinibossStatueState from './MinibossStatueState';

var MISSILE_COUNT_BLOCK = 10;

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

var GAME_AGE_START_BYTE = 11;
var GAME_AGE_END_BYTE = 14;

class GameStateStruct {
  constructor(buffer) {
    this._buffer = buffer;
    this.powerups = new PowerUps(buffer);
    this.items = new Items(buffer);
    this.bossesKilled = new BossesKilled();
    this.statuesRaised = new MinibossStatueState();
  }

  get missiles() {
    return this._buffer.getBlock(MISSILE_COUNT_BLOCK);
  }

  set missiles(missileCount) {
    this._buffer.setBlock(MISSILE_COUNT_BLOCK, missileCount);
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
        this._buffer.setBits(bitsToSet, [true, true, true]);
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

  get gameAge() {
    var gameAgeInTicks = 0;
    var gameAgeBlocks = this._buffer.getBlocks(GAME_AGE_START_BYTE, GAME_AGE_END_BYTE);

    gameAgeBlocks.forEach(function(block) {
      gameAgeInTicks += block;
      gameAgeInTicks <<= 8;
    });
  }

  set gameAge(gameAgeInTicks) {
    var gameAgeBlocks = [];

    var gameAgeTmp = gameAgeInTicks;

    for (var i = 0; i < 4; i++) {
      gameAgeBlocks.push(gameAgeTmp & 0xff);
      gameAgeTmp >>= 8;
    }

    this._buffer.setBlocks(GAME_AGE_START_BYTE, GAME_AGE_END_BYTE, gameAgeBlocks);
  }
}

export default GameStateStruct;
