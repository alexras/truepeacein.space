import React, { Component } from 'react';
import './Doors.css';
import redSquareEmpty from './images/red-square-empty.png';
import redSquareFilled from './images/red-square-filled.png';

var areas = ['brinstar', 'norfair', 'ridley', 'kraid', 'tourian'];

class Doors extends Component {
  render() {
    var areaDivs = [];

    areas.forEach(function(areaName) {
      var doorDivs = [];
      var doors = this.props.items[areaName].doors;

      if (doors) {
        Object.keys(doors).forEach(function(door, index) {
          doorDivs.push((
            <div key={"door-" + areaName + "-" + index} className="door"><img alt={'Door ' + areaName + ' ' + (index + 1)} src={doors[door] ? redSquareFilled : redSquareEmpty}/></div>
          ));
        });

        areaDivs.push((
          <div key={"Doors-" + areaName} className="doorsForArea">
            <h5>{areaName}</h5>
            <div className="doorList">
              {doorDivs}
            </div>
          </div>
        ));
      }
    }.bind(this));

    return (
        <div className="Doors">
          <h4>Doors</h4>
          {areaDivs}
        </div>
    );
  }
}

export default Doors;
