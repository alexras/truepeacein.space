import React, { Component } from 'react';

import ridleyLowered from './images/ridley-statue-lowered.png';
import ridleyRaised from './images/ridley-statue-raised.png';
import kraidLowered from './images/kraid-statue-lowered.png';
import kraidRaised from './images/kraid-statue-raised.png';

import './MinibossStatues.css';

class MinibossStatue extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="statue">
        <img alt={this.props.name + '-statue'} src={this.props.gameState.statuesRaised[this.props.name.toLowerCase()] ? this.props.raisedImage : this.props.loweredImage } onClick={this.handleClick}/>
      </div>
    );
  }

  handleClick() {
    this.props.gameState.statuesRaised[this.props.name.toLowerCase()] =
      !(this.props.gameState.statuesRaised[this.props.name.toLowerCase()]);
  }
};

class MinibossStatues extends Component {
  render() {
    return (
      <div className="MinibossStatues">
        <h3>Miniboss Statues</h3>
        <div className="statues">
          <MinibossStatue name="Ridley" gameState={this.props.gameState} loweredImage={ridleyLowered} raisedImage={ridleyRaised} />
          <MinibossStatue name="Kraid" gameState={this.props.gameState} loweredImage={kraidLowered} raisedImage={kraidRaised} />
        </div>
      </div>
    );
  }
};

export default MinibossStatues;
