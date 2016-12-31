import React, { Component } from 'react';
import './MissileCount.css';
import './fonts.css';
import missile from './images/missile.png';

class MissileCount extends Component {
  render() {
    return (
      <div className="MissileCount">
        <h3>Missiles</h3>
        <div className="MissileCount-container">
          <img className="MissileCount-icon" src={missile} alt="Missile Count" />
          <div className="MissileCount-count">{ this.props.count }</div>
        </div>
      </div>
    );
  }
}

export default MissileCount;
