import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import PollList from './PollList';
import api from '../util/api';

class User extends Component {
  
  state = {
    polls: []
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    api.getUserPolls(token)
    .then((polls) => {
      this.setState({polls: polls});
    });
  }
  

  render() {
    return (
      <PollList polls={this.state.polls} loggedIn/>
    );
  }
}

User.propTypes = {

};

export default User;