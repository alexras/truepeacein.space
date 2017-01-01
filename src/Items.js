import React, { Component } from 'react';
import './Items.css';

import missiletank from './images/missile-tank.png';
import energytank from './images/energy-tank.png';

var areas = ['norfair', 'brinstar', 'ridley', 'kraid'];

class MissileContainers extends Component {
  render() {
    var missileDivs = [];

    areas.forEach(function(areaName) {
      var missiles = this.props.items[areaName].missileContainers;

      if (missiles) {
        missiles.forEach(function(missile, index) {
          missileDivs.push(<div key={"missile-" + areaName + "-" + index} className="item"><img alt={'Energy Tank ' + (index + 1)} key={'missile-' + index } src={missiletank} className={ missile ? "item-acquired" : "item-missing" } /></div>);
        });
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
          energyTankDivs.push(<div key={"etank-" + areaName + "-" + index} className="item"><img alt={'Energy Tank ' + (index + 1)} key={'etank-' + index } src={energytank} className={energyTank ? "item-acquired" : "item-missing" } /></div>);
        });
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
