import React, { Component } from 'react';
import './StartLocation.css';

class StartLocation extends Component {
  constructor(props) {
    super(props);
    this.setStartLocation = this.setStartLocation.bind(this);
  }

  setStartLocation(location) {
    this.props.gameState.startLocation = location;
  }

  render() {
    const startLocation = this.props.gameState.startLocation;

    const locations = {
      brinstar: 'Brinstar',
      norfair: 'Norfair',
      ridleysLair: "Ridley's Lair",
      kraidsLair: "Kraid's Lair",
      tourian: 'Tourian'
    };

    var locationHeaders = Object.keys(locations).map((location) => {
      var humanReadableLocationName = locations[location];
      return (<h4 key={location} className={location === startLocation ? "startLocation" : ""} onClick={ function() {
        this.setStartLocation(location);
      }.bind(this) }>{humanReadableLocationName}</h4>);
    });

    return (
      <div className="StartLocation">
        <h3>Start Location</h3>
        { locationHeaders }
      </div>
    );
  }
}

export default StartLocation;
