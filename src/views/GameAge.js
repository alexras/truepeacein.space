import React, { Component } from 'react';
import './GameAge.css';

function toIntInRange(strVal, min, max) {
  var intVal = min;

  if (strVal.length > 0) {
    intVal = parseInt(strVal, 10);

    if (intVal < min) {
      intVal = min;
    }

    if (max && intVal > max) {
      intVal = max;
    }
  }

  return intVal;
}

class GameAgeForVideoSystem extends Component {
  constructor(props) {
    super(props);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
    this.onChangeSeconds = this.onChangeSeconds.bind(this);
  }

  render() {
    return (
      <div>
        <div className="timeHeader"><h4>{this.props.videoSystemName}</h4></div>
        <div className="timeRow">
          <div className="timeBox">
            <h4>Hours</h4>
            <input className="time hours" type="text" pattern="[0-9]+" maxLength="9" value={this.props.age.hms.hours} onChange={this.onChangeHours} />
          </div>
          <div className="timeBox">
            <h4>Minutes</h4>
            <input className="time minutes" type="text" pattern="[0-9]{2}" maxLength="2" value={this.props.age.hms.minutes} onChange={this.onChangeMinutes} />
          </div>
          <div className="timeBox">
            <h4>Seconds</h4>
           <input className="time seconds" type="text" pattern="[0-9]{2}" maxLength="2" value={this.props.age.hms.seconds} onChange={this.onChangeSeconds} />
          </div>
        </div>
      </div>
    );
  }

  onChangeHours(input) {
    var oldHMS = this.props.age.hms;
    this.props.age.hms = {
      hours: toIntInRange(input.target.value, 0),
      minutes: oldHMS.minutes,
      seconds: oldHMS.seconds
    };
  }

  onChangeMinutes(input) {
    var oldHMS = this.props.age.hms;
    this.props.age.hms = {
      hours: oldHMS.hours,
      minutes: toIntInRange(input.target.value, 0, 59),
      seconds: oldHMS.seconds
    };
  }

  onChangeSeconds(input) {
    var oldHMS = this.props.age.hms;
    this.props.age.hms = {
      hours: oldHMS.hours,
      minutes: oldHMS.minutes,
      seconds: toIntInRange(input.target.value, 0, 59)
    };
  }
}

class GameAge extends Component {
  render() {
    return(
      <div className="GameAge">
        <h3>Game Age</h3>
        <GameAgeForVideoSystem videoSystemName="NTSC" age={this.props.age.ntsc} />
        <GameAgeForVideoSystem videoSystemName="PAL" age={this.props.age.pal} />
      </div>
    );
  }
};

export default GameAge;
