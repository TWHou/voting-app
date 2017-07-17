import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserMenu from './UserMenu';

class Header extends Component {

  render() {
    const username = this.props.username;
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand">Pollster</h1>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink activeClassName='active' to='/' exact className="nav-link p-2">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName='active' to='/polls' exact className="nav-link p-2">All Polls</NavLink>
            </li>
          </ul>
          <div className="">
            {username ? <UserMenu username={username}/> : 'Welcome'}
            {username ? <Link to="/logout" className="btn">Logout</Link> : <div><Link to="/login" className="btn">Login</Link><Link to="/register" className="btn">Sign Up</Link></div>}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string
};

export default Header;