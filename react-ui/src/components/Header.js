import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import LoginControl from './LoginControl';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-faded flex-row align-items-baseline">
        <h1 className="navbar-brand mb-0">Pollster</h1>
        <ul className="navbar-nav flex-row align-items-baseline">
          <li className="nav-item">
            <NavLink activeClassName='active' to='/' exact className="nav-link p-2">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='active' to='/polls' exact className="nav-link p-2">All Polls</NavLink>
          </li>
        </ul>
        <LoginControl />
      </nav>
    );
  }
}

export default Header;