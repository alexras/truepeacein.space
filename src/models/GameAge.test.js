import BitBuffer from './BitBuffer';
import GameAge from './GameAge';

describe('bytes to ticks conversion', () => {
  var buffer;
  var gameAge;

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    gameAge = new GameAge(buffer);
  });

  it('should read ticks properly', () => {
    buffer.setBytes(11, 14, [0x89, 0xab, 0xcd, 0xef]);

    expect(gameAge.ntsc.ticks).toBe(0x89abcdef);
  });

  it('should write ticks properly', () => {
    gameAge.ntsc.ticks = 0xddbcf145;

    expect(buffer.getBytes(11, 14))
      .toEqual(new Uint8Array([0xdd, 0xbc, 0xf1, 0x45]));
  });

  it('should convert ticks to seconds properly', () => {
    gameAge.ntsc.ticks = 0xddbcf145;
    expect(gameAge.ntsc.seconds).toBe(15872628347);
    expect(gameAge.pal.seconds).toBe(19047154017);
  });

  it('should set NTSC seconds properly', () => {
    gameAge.ntsc.seconds = 15872628348;
    expect(gameAge.ntsc.ticks).toBe(0xddbcf145);
  });

  it('should set PAL seconds properly', () => {
    gameAge.pal.seconds = 19047154018;
    expect(gameAge.ntsc.ticks).toBe(0xddbcf145);
  });

  it('should convert ticks to hours, minutes, and seconds properly', () => {
    gameAge.ntsc.seconds = 6533;
    expect(gameAge.ntsc.hms).toEqual({
      hours: 1,
      minutes: 48,
      seconds: 52
    });

    gameAge.pal.seconds = 6533;
    expect(gameAge.pal.hms).toEqual({
      hours: 1,
      minutes: 48,
      seconds: 48
    });
  });

  it('should set hours, minutes, and seconds properly', () => {
    gameAge.ntsc.hms = {
      hours: 2,
      minutes: 30,
      seconds: 0
    };

    // Not precisely 9000 because of tick conversion precision
    expect(gameAge.ntsc.seconds).toBe(8998);

    gameAge.pal.hms = {
      hours: 2,
      minutes: 30,
      seconds: 0
    };

    // Not precisely 9000 because of tick conversion precision
    expect(gameAge.pal.seconds).toBe(8995);
  });

  it('should throw if hours, minutes, or seconds are missing when setting HMS', () => {
    expect(() => {
      gameAge.ntsc.hms = {
        minutes: 2,
        seconds: 30
      };
    }).toThrowError(/hours/i);

    expect(() => {
      gameAge.ntsc.hms = {
        hours: 2,
        seconds: 30
      };
    }).toThrowError(/minutes/i);

    expect(() => {
      gameAge.ntsc.hms = {
        hours: 2,
        minutes: 30
      };
    }).toThrowError(/seconds/i);
  });

  it('should throw if hours, minutes, or seconds are not numbers when setting HMS', () => {
    expect(() => {
      gameAge.ntsc.hms = {
        hours: 'spice weasel',
        minutes: 2,
        seconds: 30
      };
    }).toThrowError(/hours/i);

    expect(() => {
      gameAge.ntsc.hms = {
        hours: 2,
        minutes: 'slurm',
        seconds: 30
      };
    }).toThrowError(/minutes/i);

    expect(() => {
      gameAge.ntsc.hms = {
        hours: 2,
        minutes: 30,
        seconds: 'whammy wham wham wozzle'
      };
    }).toThrowError(/seconds/i);
  });
});
