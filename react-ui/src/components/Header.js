import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserMenu from './UserMenu';

class Header extends Component {

  render() {
    const username = this.props.username;
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
        <div className="d-inline-flex ml-auto align-items-baseline">
          {username ? <UserMenu username={username}/> : 'Welcome'}
          {username ? <Link to="/logout" className="btn">Logout</Link> : <div><Link to="/login" className="btn">Login</Link><Link to="/register" className="btn">Sign Up</Link></div>}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string
};

export default Header;