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
        <div className="minibosses">
          <img src={ridley} alt="Ridley" className={(this.props.killed.ridley ? "dead" : "alive")} />
          <img src={kraid} alt="Kraid" className={(this.props.killed.kraid ? "dead" : "alive")} />
        </div>
        <div className="motherBrainContainer">
          <img src={motherbrain} alt="Mother Brain" className={(this.props.killed.motherBrain ? "dead" : "alive") + " motherBrain"} />
          <img alt="Zebetite 1" className="zebetite" src={this.props.zebetites[0] ? zebetiteDead : zebetiteAlive } />
          <img alt="Zebetite 2" className="zebetite" src={this.props.zebetites[1] ? zebetiteDead : zebetiteAlive } />
          <img alt="Zebetite 3" className="zebetite" src={this.props.zebetites[2] ? zebetiteDead : zebetiteAlive } />
          <img alt="Zebetite 4" className="zebetite" src={this.props.zebetites[3] ? zebetiteDead : zebetiteAlive } />
          <img alt="Zebetite 5" className="zebetite" src={this.props.zebetites[4] ? zebetiteDead : zebetiteAlive } />
        </div>
      </div>
    );
  }
}

export default Bosses;
