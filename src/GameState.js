import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';

function newEmptyGameState() {
  return {
    powerups: {
      morphball: {
        taken: false,
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
    items: {
      brinstar: {
        missileContainers: [false, false],
        energyTanks: [false, false, false],
        doors: [false, false, false, false, false]
      },
      tourian: {
        doors: [false, false, false]
      },
      norfair: {
        missileContainers: [false, false, false, false, false, false, false, false, false, false, false, false],
        energyTanks: [false],
        doors: [false, false, false, false]
      },
      ridley: {
        missileContainers: [false, false, false],
        energyTanks: [false, false],
        doors: [false, false]
      },
      kraid: {
        missileContainers: [false, false, false, false],
        doors: [false, false, false, false, false]
      }
    },
    missiles: 0
  };
}

class GameState extends Component {
  constructor(props) {
    super(props);
    this.state = newEmptyGameState();
  }

  render() {
    return (
      <div className="GameState">
        <div className="GameState-row">
          <div className="GameState-column">
            <PowerUpList powerups={this.state.powerups} />
          </div>
          <div className="GameState-column">
            <Items items={this.state.items} />
          </div>
          <div className="GameState-column">
            <MissileCount count={this.state.missiles} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameState;
