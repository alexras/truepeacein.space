import React, { Component } from 'react';
import './Items.css';

import missiletank from './images/missile-tank.png';
import energytank from './images/energy-tank.png';

var areas = ['norfair', 'brinstar', 'ridley', 'kraid'];

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.items[this.props.index] = !(this.props.items[this.props.index]);
  }

  render() {
    const index = this.props.index;
    const itemType = this.props.itemType;
    const img = this.props.img;

    return (
      <div className='item'>
        <img alt={itemType + ' ' + (index + 1)} src={img} className={ this.props.items[index] ? "item-acquired" : "item-missing" } onClick={this.handleClick} />
      </div>
    );
  }
};

class MissileContainers extends Component {
  render() {
    var missileDivs = [];

    areas.forEach(function(areaName) {
      var missiles = this.props.items[areaName].missileContainers;

      if (missiles) {
        missiles.forEach(function(missile, index) {
          missileDivs.push(<Item key={'missileContainers-' + areaName + '-' + index} items={this.props.items[areaName].missileContainers} itemType='Missile Container' index={index} img={missiletank} />);
        }.bind(this));
      }
    }.bind(this));

    return (
      <div key="Items-sections-missiles" className="itemList">
        <h4>Missile Containers</h4>
        <div className="Items-list">
          {missileDivs}
        </div>
      </div>
    );
  }
}

class EnergyTanks extends Component {
  render() {
    var energyTankDivs = [];

    areas.forEach(function(areaName) {
      var energyTanks = this.props.items[areaName].energyTanks;

      if (energyTanks) {
        energyTanks.forEach(function(energyTank, index) {
          energyTankDivs.push(<Item key={'energyTanks-' + areaName + '-' + index} items={this.props.items[areaName].energyTanks} itemType='Energy Tank' index={index} img={energytank} />);
        }.bind(this));
      }
    }.bind(this));

    return (
      <div key="Items-section-etanks" className="itemList">
        <h4>Energy Tanks</h4>
        <div className="Items-list">
          {energyTankDivs}
        </div>
      </div>
    );
  }
}

class Items extends Component {
  render() {
    return (
      <div className="Items">
        <h3>Items</h3>
        <MissileContainers items={this.props.items} />
        <EnergyTanks items={this.props.items} />
      </div>
    );
  }
}

export default Items;
