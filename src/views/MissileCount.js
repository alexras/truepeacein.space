import React, { Component } from 'react';
import './MissileCount.css';
import './fonts.css';
import missile from './images/missile.png';

class MissileCount extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="MissileCount">
        <h3>Missiles</h3>
        <div className="MissileCount-container">
          <img className="MissileCount-icon" src={missile} alt="Missile Count" />
          <input className="MissileCount-count" type="text" pattern="[0-9]+" maxLength="3" value={ this.props.gameState.missiles } onChange={this.handleChange} />
        </div>
      </div>
    );
  }

  handleChange(input) {
    var missileCount = 0;
    if (input.target.value.length > 0) {
      missileCount = parseInt(input.target.value, 10);
      if (missileCount < 0) {
        missileCount = 0;
      } else if (missileCount > 255) {
        missileCount = 255;
      }
    }

    this.props.gameState.missiles = missileCount;
  }
}

export default MissileCount;
