import React, { Component } from 'react';
import './StartLocation.css';

class StartLocation extends Component {
  constructor(props) {
    super(props);
    this.setStartLocation = this.setStartLocation.bind(this);
    this.getLocationClassName = this.getLocationClassName.bind(this);
  }

  setStartLocation(location) {
    this.props.gameState.startLocation = location;
  }

  getLocationClassName(location) {
    const startLocation = this.props.gameState.startLocation;

    if (location === startLocation) {
      if (location === "invalid") {
        return "invalidStartLocation";
      } else {
        return "startLocation";
      }
    } else {
      return "";
    }
  }

  render() {
    const locations = {
      brinstar: 'Brinstar',
      norfair: 'Norfair',
      ridleysLair: "Ridley's Lair",
      kraidsLair: "Kraid's Lair",
      tourian: 'Tourian',
      invalid: 'Invalid'
    };

    var locationHeaders = Object.keys(locations).map((location) => {
      var humanReadableLocationName = locations[location];
      return (<h4 key={location} className={this.getLocationClassName(location)} onClick={ function() {
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
