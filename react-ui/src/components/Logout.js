import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {
  
  handleSubmit = event => {
    event.preventDefault();
    this.props.onLogout();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Are you sure you want to log out?</h3>
        <input type="submit" value="Logout" />
        <button onClick={this.props.history.goBack()}>Cancel</button>
      </form>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default Logout;