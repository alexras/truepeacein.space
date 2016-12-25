import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Fake data to feed in until I can pump some real models in
var fakeGameState = {
  powerups: {
    morphball: {
      taken: true,
      equipped: false
    },
    bombs: {
      taken: false,
      equipped: false
    },
    longbeam: {
      taken: false,
      equipped: false
    },
    wavebeam: {
      taken: false,
      equipped: false
    },
    icebeam: {
      taken: false,
      equipped: false
    },
    screwattack: {
      taken: false,
      equipped: false
    },
    variasuit: {
      taken: false,
      equipped: false
    },
    hijumpboots: {
      taken: false,
      equipped: false
    }
  },
  missiles: 40,
  items: {
    brinstar: {
      missileContainers: [false, false],
      energyTanks: [false, true, false],
      doors: [false, true, false, false, true]
    },
    tourian: {
      doors: [true, false, true]
    },
    norfair: {
      missileContainers: [false, false, false, true, false, true, false, false, false, true, false, true],
      energyTanks: [true],
      doors: [false, true, true, false]
    },
    ridley: {
      missileContainers: [false, true, false],
      energyTanks: [false, true],
      doors: [false, true]
    },
    kraid: {
      missileContainers: [true, false, false, true],
      doors: [true, false, true, true, false]
    }
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
