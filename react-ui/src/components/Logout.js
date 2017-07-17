import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {
  
  handleSubmit = event => {
    event.preventDefault();
    this.props.onLogout();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="alert alert-warning">
        <h3>Are you sure you want to log out?</h3>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Logout</button>
          <button type="button" className="btn btn-secondary" onClick={this.props.history.goBack}>Cancel</button> 
        </div>
      </form>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default Logout;