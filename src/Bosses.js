import React, { Component } from 'react';
import './Bosses.css';
import ridley from './images/ridley.png';
import kraid from './images/kraid.png';
import motherbrain from './images/motherbrain.png';
import zebetiteAlive from './images/zebetite-alive.png';
import zebetiteDead from './images/zebetite-dead.png';

class Bosses extends Component {
  render() {
    return (
      <div className="Bosses">
        <h3>Bosses</h3>
        <div className="Bosses-Row">
          <img src={ridley} alt="Ridley" className={this.props.killed.ridley ? "Bosses-dead" : "Bosses-alive"} />
          <img src={kraid} alt="Kraid" className={this.props.killed.kraid ? "Bosses-dead" : "Bosses-alive"} />
          <img src={motherbrain} alt="Mother Brain" className={this.props.killed.motherBrain ? "Bosses-dead" : "Bosses-alive"} />
          <img src={this.props.zebetites[0] ? zebetiteDead : zebetiteAlive } />
          <img src={this.props.zebetites[1] ? zebetiteDead : zebetiteAlive } />
          <img src={this.props.zebetites[2] ? zebetiteDead : zebetiteAlive } />
          <img src={this.props.zebetites[3] ? zebetiteDead : zebetiteAlive } />
          <img src={this.props.zebetites[4] ? zebetiteDead : zebetiteAlive } />
        </div>
      </div>);
  }
}

export default Bosses;
