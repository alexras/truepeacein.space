import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';

class GameState extends Component {
  render() {
    return (
      <div className="GameState">
        <div className="GameState-row">
          <div className="GameState-column">
            <PowerUpList powerups={this.props.gameState.powerups} />
          </div>
          <div className="GameState-column">
            <Items items={this.props.gameState.items} />
          </div>
          <div className="GameState-column">
            <MissileCount count={this.props.gameState.missiles} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameState;
