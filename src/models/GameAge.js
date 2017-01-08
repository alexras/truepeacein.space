var REFRESHES_PER_TICK = 256;
var NTSC_REFRESH_RATE_HZ = 60;
var PAL_REFRESH_RATE_HZ = 50;

var GAME_AGE_START_BYTE = 11;
var GAME_AGE_END_BYTE = 14;

class Timer {
  constructor(buffer, refreshRate) {
    this._buffer = buffer;
    this._refreshRate = refreshRate;
  }

  get seconds() {
    return Math.floor((this.ticks * REFRESHES_PER_TICK) / this._refreshRate);
  }

  set seconds(numSeconds) {
    this.ticks = (numSeconds * this._refreshRate) / REFRESHES_PER_TICK;
  }

  get hms() {
    var totalSeconds = this.seconds;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  set hms(newHMS) {
    if (isNaN(newHMS.hours)) {
      throw new Error('Hours must be specified and must be a number');
    }

    if (isNaN(newHMS.minutes)) {
      throw new Error('Minutes must be specified and must be a number');
    }

    if (isNaN(newHMS.seconds)) {
      throw new Error('Seconds must be specified and must be a number');
    }

    this.seconds = Math.floor(newHMS.hours * 3600 + newHMS.minutes * 60 + newHMS.seconds);
  }

  get ticks() {
    var gameAgeInTicks = 0;
    var gameAgeBytes = this._buffer.getBytes(GAME_AGE_START_BYTE, GAME_AGE_END_BYTE);

    gameAgeBytes.forEach(function(byte) {
      gameAgeInTicks <<= 8;
      gameAgeInTicks += byte;
    });

    // Convert signed to unsigned with a zero-fill shift right (grossssss)
    gameAgeInTicks >>>= 0;

    return gameAgeInTicks;
  }

  set ticks(gameAgeInTicks) {
    var gameAgeBytes = [];

    var gameAgeTmp = gameAgeInTicks;

    for (var i = 0; i < 4; i++) {
      gameAgeBytes.unshift(gameAgeTmp & 0xff);
      gameAgeTmp >>>= 8;
    }

    this._buffer.setBytes(GAME_AGE_START_BYTE, GAME_AGE_END_BYTE, gameAgeBytes);
  }
};

class GameAge {
  constructor(buffer) {
    this.ntsc = new Timer(buffer, NTSC_REFRESH_RATE_HZ);
    this.pal = new Timer(buffer, PAL_REFRESH_RATE_HZ);
  }
};

export default GameAge;
