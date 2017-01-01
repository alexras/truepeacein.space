import React, { Component } from 'react';
import './Armor.css';
import spacesuit from './images/spacesuit.png';
import swimsuit from './images/swimsuit.png';

class Armor extends Component {
  render() {
    return (
      <div className="Armor">
        <h3>Armor</h3>
        <img alt="Armor" src={this.props.swimsuit ? swimsuit : spacesuit } />
      </div>
    );
  }
}

export default Armor;
