import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';
import StartLocation from './StartLocation';
import Bosses from './Bosses';
import Armor from './Armor';
import Doors from './Doors';
import GameAge from './GameAge';
import MinibossStatues from './MinibossStatues';

class GameState extends Component {
  render() {
    return (
      <div className="GameState">
        <div className="column">
          <Bosses gameState={this.props.gameState} />
          <Doors items={this.props.gameState.items} />
          <MinibossStatues gameState={this.props.gameState} />
        </div>
        <div className="column">
          <GameAge age={this.props.gameState.gameAge} />
          <Items items={this.props.gameState.items} />
        </div>
        <div className="column">
          <PowerUpList powerups={this.props.gameState.powerups} />
          <div className="row">
            <MissileCount gameState={this.props.gameState} />
            <Armor gameState={this.props.gameState} />
          </div>
          <StartLocation gameState={this.props.gameState} />
        </div>
      </div>
    );
  }
}







export default GameState;
