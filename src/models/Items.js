function defineBufferOffsetGetter(buffer, obj, propName, offset, onChange) {
  Object.defineProperty(
    obj, propName, {
      enumerable: true,
      get: function () {
        return buffer.getBit(offset);
      },
      set: function(newVal) {
        buffer.setBit(offset, newVal);
        onChange();
      }
    });
}

class Area {
  constructor(buffer, itemOffsets, onChange) {
    if (itemOffsets.missileContainers) {
      this.missileContainers = {};

      itemOffsets.missileContainers.forEach(function(missileContainerOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.missileContainers, arrayIndex.toString(), missileContainerOffset, onChange);
      }.bind(this));
    }

    if (itemOffsets.energyTanks) {
      this.energyTanks = {};

      itemOffsets.energyTanks.forEach(function(energyTankOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.energyTanks, arrayIndex.toString(), energyTankOffset, onChange);
      }.bind(this));
    }

    if (itemOffsets.zebetites) {
      this.zebetites = {};

      itemOffsets.zebetites.forEach(function(zebetiteOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.zebetites, arrayIndex.toString(), zebetiteOffset, onChange);
      }.bind(this));
    }

    if (itemOffsets.doors) {
      this.doors = {};

      Object.keys(itemOffsets.doors).forEach(function(doorName) {
        defineBufferOffsetGetter(buffer, this.doors, doorName, itemOffsets.doors[doorName], onChange);
      }.bind(this));
    }
  }
}

class Items {
  constructor(buffer, onChange) {
    this.brinstar = new Area(buffer, {
      missileContainers: [1, 8],
      energyTanks: [4, 9, 12],
      doors: {
        longBeam: 2,
        tourianBridge: 3,
        bombs: 5,
        iceBeam: 7,
        varia: 10
      }
    }, onChange);

    this.tourian = new Area(buffer, {
      doors: {
        one: 50,
        two: 51,
        three: 52
      },
      zebetites: [53, 54, 55, 56, 57]
    }, onChange);

    this.norfair = new Area(buffer, {
      missileContainers: [13, 14, 16, 17, 18, 19, 20, 21, 22, 27, 28, 31],
      energyTanks: [30],
      doors: {
        hiJumpBoots: 23,
        screwAttack: 25,
        waveBeam: 29,
        iceBeam: 15
      }
    }, onChange);

    this.ridley = new Area(buffer, {
      missileContainers: [43, 46, 49],
      energyTanks: [45, 48],
      doors: {
        one: 44,
        ridleysRoom: 47
      }
    }, onChange);

    this.kraid = new Area(buffer, {
      missileContainers: [33, 34, 39, 40],
      energyTanks: [36, 42],
      doors: {
        one: 32,
        two: 35,
        three: 37,
        four: 38,
        kraidsRoom: 41
      }
    }, onChange);
  }
}

export default Items;
