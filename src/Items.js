import React, { Component } from 'react';
import './Items.css';

import missiletank from './images/missile-tank.png';
import energytank from './images/energy-tank.png';

class ItemsForArea extends Component {
  constructor(props) {
    super(props);
    this.state = props.status;
  }

  render() {
    const missiles = this.state.missileContainers;
    const energyTanks = this.state.energyTanks;
    //  var doors = props.status.doors;

    var sections = [];

    if (missiles) {
      var missileDivs = [];

      missiles.forEach(function(missile, index) {
        missileDivs.push(<div key={"missile-" + index} className="item"><img alt={'Energy Tank ' + (index + 1)} key={'missile-' + index } src={missiletank} className={ missile ? "item-acquired" : "item-missing" } /></div>);
      });

      sections.push((
        <div key="Items-section-missiles" className="Items-section-missiles">
          <h5>Missile Containers</h5>
          <div className="Items-list">
            { missileDivs }
          </div>
        </div>
      ));
    }

    if (energyTanks) {
      var energyTankDivs = [];

      energyTanks.forEach(function(energyTank, index) {
        energyTankDivs.push(<div key={"etank-" + index} className="item"><img alt={'Energy Tank ' + (index + 1)} key={'etank-' + index } src={energytank} className={energyTank ? "item-acquired" : "item-missing" } /></div>);
      });
      sections.push((
        <div key="Items-sections-energyTanks" className="Items-section-energyTanks">
          <h5>Energy Tanks</h5>
          <div className="Items-list">
            { energyTankDivs }
          </div>
        </div>
      ));
    }

    return (
      <div className="Items">
        <h4>{ this.props.areaName }</h4>
        {sections}
      </div>
    );
  }
}

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = props.items;
  }

  render() {
    return (
      <div className="Items">
        <h3>Items</h3>
        <ItemsForArea areaName="Brinstar" status={this.state.brinstar} />
        <ItemsForArea areaName="Norfair" status={this.state.norfair} />
        <ItemsForArea areaName="Ridley's Lair" status={this.state.ridley} />
        <ItemsForArea areaName="Kraid's Lair" status={this.state.kraid} />
      </div>
    );
  }
}

export default Items;
