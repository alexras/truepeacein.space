import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';
import StartLocation from './StartLocation';
import Bosses from './Bosses';
import Armor from './Armor';
import Doors from './Doors';

class GameState extends Component {
  render() {
    return (
      <div className="GameState">
        <div className="column">
          <PowerUpList powerups={this.props.gameState.powerups} />
          <Bosses killed={this.props.gameState.bossesKilled} zebetites={this.props.gameState.items.tourian.zebetites} />
          <Doors items={this.props.gameState.items} />
        </div>
        <div className="column">
          <Items items={this.props.gameState.items} />
        </div>
        <div className="column">
          <MissileCount count={this.props.gameState.missiles} />
          <StartLocation location={this.props.gameState.startLocation} />
          <Armor swimsuit={this.props.gameState.swimsuit} />
        </div>
      </div>
    );
  }
}







export default GameState;
