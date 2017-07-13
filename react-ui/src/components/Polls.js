import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PollList from './PollList';
import NewPoll from './NewPoll';
import Poll from './Poll';
import api from '../util/api';

class Polls extends Component {

  state = {
    polls: []
  }

  addPoll = (poll) => {
    const token = localStorage.getItem('token');
    api.newPoll(poll, token)
    .then((poll) => {
      this.setState((state) => ({
        polls: state.polls.concat([ poll ])
      }));
      this.props.history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
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
        <Route exact
          path='/polls/new'
          render={() => <NewPoll onSubmit={this.addPoll}/>}
        />
        <Route path='/polls/:number' component={Poll}/>
      </Switch>
    );
  }
}

Polls.propTypes = {
  history: PropTypes.object.isRequired
};

export default Polls;