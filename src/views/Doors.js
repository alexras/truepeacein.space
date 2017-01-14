import React, { Component } from 'react';
import './Doors.css';
import redSquareEmpty from './images/red-square-empty.png';
import redSquareFilled from './images/red-square-filled.png';

var areas = ['brinstar', 'norfair', 'ridley', 'kraid', 'tourian'];

class Door extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div key={"door-" + this.props.areaName + "-" + this.props.index} className="door">
        <img alt={'Door ' + this.props.areaName + ' ' + (this.props.index + 1)} src={this.props.areaItems.doors[this.props.doorName] ? redSquareEmpty : redSquareFilled} onClick={this.handleClick}/>
      </div>
    );
  }

  handleClick() {
    this.props.areaItems.doors[this.props.doorName] = !(this.props.areaItems.doors[this.props.doorName]);
  }
}

class Doors extends Component {
  render() {
    var areaDivs = [];

    areas.forEach(function(areaName) {
      var doorDivs = [];
      var doors = this.props.items[areaName].doors;

      if (doors) {
        Object.keys(doors).forEach(function(door, index) {
          doorDivs.push((
              <Door key={areaName + '-' + index } areaName={areaName} index={index} areaItems={this.props.items[areaName]} doorName={door}/>
          ));
        }.bind(this));

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
