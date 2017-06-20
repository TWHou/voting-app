import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserMenu from './UserMenu';

class LoginControl extends Component {

  state = {
    isLoggedIn: this.props.username != null
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <Link to="/logout" className="btn">Logout</Link>;
    } else {
      button = <Link to="/login" className="btn">Login</Link>;
    }
    return (
      <div className="d-inline-flex ml-auto align-items-baseline">
        {isLoggedIn ? <UserMenu username={this.props.username}/> : 'Welcome'}
        {button}
      </div>
    );
  }
}

LoginControl.propTypes = {
  username: PropTypes.string
};

export default LoginControl;