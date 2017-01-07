function defineBufferOffsetGetter(buffer, obj, propName, offset) {
  Object.defineProperty(
    obj, propName, {
      get: function () {
        return buffer.getBit(offset);
      },
      set: function(newVal) {
        buffer.setBit(newVal);
      }
    });
}

class Area {
  constructor(buffer, itemOffsets) {

    if (itemOffsets.missileContainers) {
      this.missileContainers = {};

      itemOffsets.missileContainers.forEach(function(missileContainerOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.missileContainers, arrayIndex.toString(), missileContainerOffset);
      });
    }

    if (itemOffsets.energyTanks) {
      this.energyTanks = {};

      itemOffsets.energyTanks.forEach(function(energyTankOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.energyTanks, arrayIndex.toString(), energyTankOffset);
      });
    }

    if (itemOffsets.zebetites) {
      this.zebetites = {};

      itemOffsets.zebetites.forEach(function(zebetiteOffset, arrayIndex) {
        defineBufferOffsetGetter(buffer, this.zebetites, arrayIndex.toString(), zebetiteOffset);
      });
    }

    if (itemOffsets.doors) {
      this.doors = {};

      Object.keys(itemOffsets.doors).forEach(function(doorName) {
        defineBufferOffsetGetter(buffer, this.energyTanks, doorName, itemOffsets.doors[doorName]);
      });
    }
  }
}

class Items {
  constructor(buffer) {
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
    });

    this.tourian = new Area(buffer, {
      doors: {
        one: 50,
        two: 51,
        three: 52
      },
      zebetites: [53, 54, 55, 56, 57]
    });

    this.norfair = new Area(buffer, {
      missileContainers: [13, 14, 16, 17, 18, 19, 20, 21, 22, 27, 28, 31],
      energyTanks: [30],
      doors: {
        hiJumpBoots: 23,
        screwAttack: 25,
        waveBeam: 29,
        iceBeam: 15
      }
    });
    this.ridley = new Area(buffer, {
      missileContainers: [43, 46, 49],
      energyTanks: [45, 48],
      doors: {
        one: 44,
        ridleysRoom: 47
      }
    });
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
    });
  }
}

export default Items;
