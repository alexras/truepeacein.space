import React from 'react';
import './Items.css';

import missiletank from './images/missile-tank.png';
import energytank from './images/energy-tank.png';

function ItemsForArea(props) {
  var missiles = props.status.missileContainers;
  var energyTanks = props.status.energyTanks;
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
      <h4>{ props.name }</h4>
      {sections}
    </div>
  );
}

function Items(props) {
  return (
    <div className="Items">
      <h3>Items</h3>
      <ItemsForArea name="Brinstar" status={props.items.brinstar} />
      <ItemsForArea name="Norfair" status={props.items.norfair} />
      <ItemsForArea name="Ridley's Lair" status={props.items.ridley} />
      <ItemsForArea name="Kraid's Lair" status={props.items.kraid} />
    </div>
  );
}

export default Items;
