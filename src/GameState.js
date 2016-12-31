import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';

class GameState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: props.state
    };
  }

  render() {
    return (
      <div className="GameState">
        <div className="GameState-row">
          <div className="GameState-column">
            <PowerUpList powerups={this.state.gameState.powerups} />
          </div>
          <div className="GameState-column">
            <Items items={this.state.gameState.items} />
          </div>
          <div className="GameState-column">
            <MissileCount count={this.state.gameState.missiles} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameState;
