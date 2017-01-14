import BitBuffer from './BitBuffer';
import GameAge from './GameAge';

describe('bytes to ticks conversion', () => {
  var buffer;
  var onChange;
  var gameAge;

  beforeEach(() => {
    buffer = BitBuffer.newEmptyBuffer();
    onChange = jest.fn();
    gameAge = new GameAge(buffer, onChange);
  });

  it('should read ticks properly', () => {
    buffer.setBytes(11, 14, [0x89, 0xab, 0xcd, 0xef]);

    expect(gameAge.ntsc.ticks).toBe(0xefcdab89);
  });

  it('should write ticks properly', () => {
    gameAge.ntsc.ticks = 0xddbcf145;

    expect(buffer.getBytes(11, 14))
      .toEqual(new Uint8Array([0x45, 0xf1, 0xbc, 0xdd]));
    expect(onChange).toHaveBeenCalled();
  });

  it('should convert ticks to seconds properly', () => {
    gameAge.ntsc.ticks = 300;
    expect(gameAge.ntsc.seconds).toBe(1280);
    expect(gameAge.pal.seconds).toBe(1536);
    expect(onChange).toHaveBeenCalled();
  });

  it('should set NTSC seconds properly', () => {
    gameAge.ntsc.seconds = 340;
    expect(gameAge.ntsc.ticks).toBe(79);
    expect(onChange).toHaveBeenCalled();
  });

  it('should set PAL seconds properly', () => {
    gameAge.pal.seconds = 5000;
    expect(gameAge.pal.ticks).toBe(976);
    expect(onChange).toHaveBeenCalled();
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

    expect(onChange).toHaveBeenCalledTimes(2);
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
    expect(onChange).toHaveBeenCalledTimes(2);
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
