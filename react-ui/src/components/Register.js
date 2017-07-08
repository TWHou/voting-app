import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

class Register extends Component {

  state = {
    isDirty: false,
    passerr: false
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({isDirty: true});
    const values = serializeForm(event.target, {hash: true});
    if(values.password !== values.passconf){
      this.setState({passerr: true});
    } else {
      delete values.passconf;
      this.props.onRegister(values);
    }

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={this.props.usererr ? 'form-group has-danger' : 'form-group'}>
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
          {this.props.usererr && (
            <div className="form-control-feedback">
              Sorry, that username's taken. Try another?
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
        </div>
        <div className={this.state.passerr ? 'form-group has-danger' : 'form-group'}>
          <label htmlFor="passconf">Retype Password:</label>
          <input type="password" className="form-control" id="passconf" name="passconf" placeholder="Retype Password" />
          {this.state.passerr && (
            <div className="form-control-feedback">
              The passwords did not match, please reenter passwords.
            </div>
          )}
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  usererr: PropTypes.bool
};

export default Register;