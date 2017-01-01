import React, { Component } from 'react';
import './StartLocation.css';

class StartLocation extends Component {
  render() {
    var startLocationTmp;

    if (this.props.location.norfair) {
      if (this.props.location.kraidsLair) {
        startLocationTmp = 'Tourian';
      } else {
        startLocationTmp = 'Norfair';
      }
    } else if (this.props.location.kraidsLair) {
      startLocationTmp = "Kraid's Lair";
    } else if (this.props.location.ridleysLair) {
      startLocationTmp = "Ridley's Lair";
    } else {
      startLocationTmp = 'Brinstar';
    }

    const startLocation = startLocationTmp;

    return (
      <div className="StartLocation">
        <h3>Start Location</h3>
        <h4>{startLocation}</h4>
      </div>
    );
  }
}

export default StartLocation;
