import React, { Component } from 'react';
import './Bosses.css';
import ridley from './images/ridley.png';
import kraid from './images/kraid.png';
import motherbrain from './images/motherbrain.png';
import zebetiteAlive from './images/zebetite-alive.png';
import zebetiteDead from './images/zebetite-dead.png';

class Miniboss extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
        <img src={this.props.img} alt={this.props.alt} className={(this.props.killed[this.props.bossKey] ? "dead" : "alive")}
             onClick={this.handleClick} />
    );
  }

  handleClick() {
    this.props.killed[this.props.bossKey] = !(this.props.killed[this.props.bossKey]);
  }
}

class Zebetite extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <img alt={"Zebetite " + this.props.index + 1} className="zebetite"
           src={this.props.zebetites[this.props.index] ? zebetiteDead : zebetiteAlive }
           onClick={this.handleClick} />
    );
  }

  handleClick() {
    this.props.zebetites[this.props.index] = !(this.props.zebetites[this.props.index]);
  }
}

class MotherBrain extends Component {
  constructor(props) {
    super(props);
    this.handleClickMotherBrain = this.handleClickMotherBrain.bind(this);
  }

  render() {
    return (
      <div className="motherBrainContainer">
        <img src={motherbrain} alt="Mother Brain" className={(this.props.gameState.bossesKilled.motherBrain ? "dead" : "alive") + " motherBrain"}
             onClick={this.handleClickMotherBrain}/>
        <Zebetite key="zebetite-1" index={0} zebetites={this.props.gameState.items.tourian.zebetites} />
        <Zebetite key="zebetite-2" index={1} zebetites={this.props.gameState.items.tourian.zebetites} />
        <Zebetite key="zebetite-3" index={2} zebetites={this.props.gameState.items.tourian.zebetites} />
        <Zebetite key="zebetite-4" index={3} zebetites={this.props.gameState.items.tourian.zebetites} />
        <Zebetite key="zebetite-5" index={4} zebetites={this.props.gameState.items.tourian.zebetites} />
      </div>
    );
  }

  handleClickMotherBrain() {
    this.props.gameState.bossesKilled.motherBrain = !(this.props.gameState.bossesKilled.motherBrain);
  }
}

class Bosses extends Component {
  render() {
    return (
      <div className="Bosses">
        <h3>Bosses</h3>
        <div className="minibosses">
          <Miniboss img={ridley} alt="Ridley" bossKey="ridley" killed={this.props.gameState.bossesKilled} />
          <Miniboss img={kraid} alt="Kraid" bossKey="kraid" killed={this.props.gameState.bossesKilled} />
        </div>
        <MotherBrain gameState={this.props.gameState} />
      </div>
    );
  }
}

export default Bosses;
