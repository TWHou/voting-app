import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

class Login extends Component {
  
  handleSubmit = event => {
    event.preventDefault();
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const values = serializeForm(event.target, {hash: true});
    this.props.onLogin(values, from);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="text-danger">{this.props.loginErr}</p>
        <div className={this.props.loginErr ? 'form-group row has-danger' : 'form-group row'}>
          <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
          </div>
        </div>
        <div className={this.props.loginErr ? 'form-group row has-danger' : 'form-group row'}>
          <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
          </div>
        </div>
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  location: PropTypes.object,
  loginErr: PropTypes.string
};

export default Login;