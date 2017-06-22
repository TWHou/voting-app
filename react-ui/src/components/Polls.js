import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PollList from './PollList';
import NewPoll from './NewPoll';
import Poll from './Poll';

class Polls extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/polls' component={PollList}/>
        <Route exact path='/polls/new' component={NewPoll}/>
        <Route path='/polls/:number' component={Poll}/>
      </Switch>
    );
  }
}

Polls.propTypes = {

};

export default Polls;