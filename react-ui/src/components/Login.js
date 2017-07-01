import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Login extends Component {
  
  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

Login.propTypes = {

};

export default Login;