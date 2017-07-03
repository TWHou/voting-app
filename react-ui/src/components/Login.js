import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

class Login extends Component {
  
  handleSubmit = event => {
    event.preventDefault();
    const values = serializeForm(event.target, {hash: true});
    this.props.onLogin(values);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Username:</label>
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;