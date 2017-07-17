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
        <div className={this.props.regErr.username ? 'form-group row has-danger' : 'form-group row'}>
          <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
            {this.props.regErr.username && (
              <div className="form-control-feedback">
                {this.props.regErr.username}
              </div>
            )}
          </div>
        </div>
        <div className={this.props.regErr.password ? 'form-group row has-danger' : 'form-group row'}>
          <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
            {this.props.regErr.password && (
              <div className="form-control-feedback">
                {this.props.regErr.password}
              </div>
            )}
          </div>
        </div>
        <div className={this.state.passerr ? 'form-group row has-danger' : 'form-group row'}>
          <label htmlFor="passconf" className="col-sm-2 col-form-label">Retype Password:</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="passconf" name="passconf" placeholder="Retype Password" />
            {this.state.passerr && (
              <div className="form-control-feedback">
                The passwords did not match, please reenter passwords.
              </div>
            )}
          </div>
        </div>
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    );
  }
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  regErr: PropTypes.object
};

export default Register;