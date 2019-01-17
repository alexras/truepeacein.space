import React, { Component } from 'react';
import './PowerUpList.css';
import './fonts.css';

import morphball from './images/morph-ball.png';
import longbeam from './images/long-beam.png';
import bombs from './images/bombs.png';
import icebeam from './images/ice-beam.png';
import wavebeam from './images/wave-beam.png';
import screwattack from './images/screw-attack.png';
import variasuit from './images/varia-suit.png';
import hijumpboots from './images/hi-jump-boots.png';

class PowerUp extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.status.equipped = !(this.props.status.equipped);

    if (this.props.status.taken !== null) {
      this.props.status.taken = this.props.status.equipped;
    }
  }

  render() {
    var powerUpStatusTmp;

    if (this.props.status.equipped) {
      powerUpStatusTmp = 'PowerUpList-equipped';
    } else if (this.props.status.taken) {
      powerUpStatusTmp = 'PowerUpList-inaccessible';
    } else {
      powerUpStatusTmp = 'PowerUpList-available';
    }

    const powerUpStatus = powerUpStatusTmp;

    return (
        <div className="powerup-icon">
          <img key={this.props.name} src={this.props.icon} alt={this.props.name} className={powerUpStatus} onClick={this.handleClick}/>
        </div>
    );
  }
}

class PowerUpList extends Component {
  render() {
    return (
      <div className="PowerUpList">
        <h3>Power-Ups</h3>
        <div className="icons">
          <PowerUp icon={morphball} name={"Maru Mari"} status={this.props.powerups.morphball} />
          <PowerUp icon={bombs} name={"Bombs"} status={this.props.powerups.bombs} />
          <PowerUp icon={hijumpboots} name={"Hi-Jump Boots"} status={this.props.powerups.hijumpboots} />
          <PowerUp icon={variasuit} name={"Varia Suit"} status={this.props.powerups.variasuit} />
          <PowerUp icon={screwattack} name={"Screw Attack"} status={this.props.powerups.screwattack} />
          <PowerUp icon={longbeam} name={"Long Beam"} status={this.props.powerups.longbeam} />
          <PowerUp icon={wavebeam} name={"Wave Beam"} status={this.props.powerups.wavebeam} />
          <PowerUp icon={icebeam} name={"Ice Beam"} status={this.props.powerups.icebeam} />
        </div>
      </div>
    );
  }
}

export default PowerUpList;
