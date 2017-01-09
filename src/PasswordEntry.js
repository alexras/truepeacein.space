import React, { Component } from 'react';
import './PasswordEntry.css';

class PasswordEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordString: this.props.password.str
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickChecksumFix = this.handleClickChecksumFix.bind(this);
    this.passwordValid = this.passwordValid.bind(this);
  }

  render() {
    return (
      <div className="PasswordEntry">
        <input type="text" pattern="[A-Za-z0-9?\- ]{24}" maxLength="24" value={this.state.passwordString} onChange={this.handleChange} className={this.passwordValid() ? "good" : "bad"}/>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    var nextPassword = nextProps.password.str;

    if (nextPassword !== this.state.passwordString) {
      this.setState({
        passwordString: nextPassword
      });
    }
  }

  passwordValid() {
    return this.state.passwordString.length === 24 && this.props.password.checksumOK;
  }

  handleClickChecksumFix(event) {
    this.props.password.fixChecksum();
    this.setState({
      passwordString: this.props.password.str
    });
  }

  handleChange(event) {
    var passwordString = event.target.value;

    this.setState({
      passwordString: passwordString
    });

    if (passwordString.length === 24) {
      this.props.password.str = passwordString;
    }
  }
}

export default PasswordEntry;
