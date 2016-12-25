import React, { Component } from 'react';
import './App.css';
import './fonts.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';

// Fake data to feed in until I can pump some real models in
var powerups = {
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
};

var missiles = 46;

var items = {
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
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="password-uppercase">NARPASSWORD</h2>
          <h3 className="password-lowercase">metroid password generator</h3>
        </div>
        <div className="App-body">
          <div className="App-column">
            <PowerUpList powerups={powerups} />
          </div>
          <div className="App-column">
            <Items items={items} />
          </div>
          <div className="App-column">
            <MissileCount count={missiles} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
