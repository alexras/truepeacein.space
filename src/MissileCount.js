import React, { Component } from 'react';
import './MissileCount.css';
import './fonts.css';
import missile from './images/missile.png';

class MissileCount extends Component {
  render() {
    return (
      <div className="MissileCount">
        <img className="MissileCount-icon" src={missile} alt="Missile Count" />
        <div className="MissileCount-count">{ this.props.count }</div>
      </div>
    );
  }
}

export default MissileCount;
