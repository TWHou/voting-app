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
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default Login;