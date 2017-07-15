import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PollList from './PollList';
import Poll from './Poll';
import api from '../util/api';

class Polls extends Component {

  state = {
    polls: []
  }

  componentDidMount() {
    api.getPolls().then((polls) => {
      this.setState({polls: polls});
    });
  }

  render() {
    let polls = this.state.polls;
    return (
      <Switch>
        <Route exact path='/polls' render={() => (<PollList polls={polls}/>)}/>
        <Route path='/polls/:number' component={Poll}/>
      </Switch>
    );
  }
}

Polls.propTypes = {
  history: PropTypes.object.isRequired
};

export default Polls;