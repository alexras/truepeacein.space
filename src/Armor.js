import React, { Component } from 'react';
import './Armor.css';
import spacesuit from './images/spacesuit.png';
import spacesuitVaria from './images/spacesuit-varia.png';
import swimsuit from './images/swimsuit.png';
import swimsuitVaria from './images/swimsuit-varia.png';

class Armor extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.gameState.swimsuit = !(this.props.gameState.swimsuit);
  }

  render() {
    var imgSrc;
    var swimsuitOn = this.props.gameState.swimsuit;
    var variaSuitOn = this.props.gameState.powerups.variasuit.equipped;

    if (swimsuitOn) {
      if (variaSuitOn) {
        imgSrc = swimsuitVaria;
      } else {
        imgSrc = swimsuit;
      }
    } else {
      if (variaSuitOn) {
        imgSrc = spacesuitVaria;
      } else {
        imgSrc = spacesuit;
      }
    }

    return (
      <div className="Armor">
        <h3>Armor</h3>
        <img alt="Armor" src={imgSrc} onClick={this.handleClick}/>
      </div>
    );
  }
}

export default Armor;
