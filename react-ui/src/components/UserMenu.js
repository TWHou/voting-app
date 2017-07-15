import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserMenu extends Component {
  render() {
    return (
      <div className="d-inline-flex align-items-baseline">
        <ul className="navbar-nav flex-row align-items-baseline">
          <li className="nav-item">
            <NavLink activeClassName='active' to='/user' className="nav-link p-2">My Polls</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='active' to='/newpoll' className="nav-link p-2">New Poll</NavLink>
          </li>
        </ul>
        <span>Welcome back, {this.props.username}!</span>
      </div>
    );
  }
}

UserMenu.propTypes = {
  username: PropTypes.string
};

export default UserMenu;