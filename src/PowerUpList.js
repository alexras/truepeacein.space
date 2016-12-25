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

class PowerUpListRow extends Component {
  constructor(props) {
    super(props);
    this.state = props.status;
  }

  render() {
    return (
      <tr className='PowerUpList-tableRow'>
        <td className='PowerUpList-icon'>
          <img src={this.props.icon} role="presentation"/>
        </td>
        <td className='PowerUpList-name'>
          { this.props.name }
        </td>
        <td className='PowerUpList-taken'>
          { this.state.taken ? "Yes" : "No" }
        </td>
        <td className='PowerUpList-equipped'>
          { this.state.equipped ? "Yes" : "No" }
        </td>
      </tr>
    );
  }
}

class PowerUpList extends Component {
  constructor(props) {
    super(props);
    this.state = props.powerups;
  }

  render() {
    return (
      <div className="PowerUpList">
        <h3>Power-Ups</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th className='PowerUpList-tableHeader'>TAKEN</th>
              <th className='PowerUpList-tableHeader'>EQUIPPED</th>
            </tr>
          </thead>
          <tbody>
            <PowerUpListRow icon={morphball} name={"Maru Mari"} status={this.state.morphball} />
            <PowerUpListRow icon={bombs} name={"Bombs"} status={this.state.bombs} />
            <PowerUpListRow icon={longbeam} name={"Long Beam"} status={this.state.longbeam} />
            <PowerUpListRow icon={wavebeam} name={"Wave Beam"} status={this.state.wavebeam} />
            <PowerUpListRow icon={icebeam} name={"Ice Beam"} status={this.state.icebeam} />
            <PowerUpListRow icon={screwattack} name={"Screw Attack"} status={this.state.screwattack} />
            <PowerUpListRow icon={variasuit} name={"Varia Suit"} status={this.state.variasuit} />
            <PowerUpListRow icon={hijumpboots} name={"Hi-Jump Boots"} status={this.state.hijumpboots} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default PowerUpList;
