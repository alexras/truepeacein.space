import React from 'react';
import './MissileCount.css';
import './fonts.css';
import missile from './images/missile.png';

function MissileCount(props) {
  return (
    <div className="MissileCount">
      <img className="MissileCount-icon" src={missile} alt="Missile Count" />
      <div className="MissileCount-count">{ props.count }</div>
    </div>
  );
}

export default MissileCount;
