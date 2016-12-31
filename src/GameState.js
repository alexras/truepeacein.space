import React, { Component } from 'react';
import './GameState.css';
import PowerUpList from './PowerUpList';
import MissileCount from './MissileCount';
import Items from './Items';
import StartLocation from './StartLocation';
import Bosses from './Bosses';
import Armor from './Armor';

class GameState extends Component {
  render() {
    return (
      <div className="GameState">
        <div className="GameState-row">
          <div className="GameState-column">
            <PowerUpList powerups={this.props.gameState.powerups} />
          </div>
          <div className="GameState-column">
            <div className="GameState-row">
              <Items items={this.props.gameState.items} />
            </div>
            <div className="GameState-row">
              <div className="GameState-column">
                <MissileCount count={this.props.gameState.missiles} />
              </div>
              <div className="GameState-column">
                <StartLocation location={this.props.gameState.startLocation} />
              </div>
              <div className="GameState-column">
                <Armor swimsuit={this.props.gameState.swimsuit} />
              </div>
            </div>
          </div>
          <div className="GameState-column">
            <Bosses killed={this.props.gameState.bossesKilled} zebetites={this.props.gameState.items.tourian.zebetites} />
          </div>
        </div>
        <div className="GameState-row">
          <div className="GameState-column">

          </div>
          <div className="GameState-column">

          </div>
          <div className="GameState-column">

          </div>
        </div>
      </div>
    );
  }
}

export default GameState;
