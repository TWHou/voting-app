import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import Poll from './Poll';
import PollList from './PollList';
import api from '../util/api';

class Home extends Component {
  state = {
    polls: []
  }

  handleVote = (vote) => {
    api.vote(vote, this.state.polls[0]._id)
    .then((poll) => {
      let updated = this.state.polls;
      updated[0] = poll;
      this.setState({polls: updated});
    });
  }

  componentDidMount() {
    api.getPolls().then((polls) => {
      this.setState({polls: polls});
    });
  }

  render() {
    const firstPollId = this.state.polls[0] ? this.state.polls[0]._id : '';
    return (
      <div>
        <h5>Latest Poll:</h5>
        <Poll pollId={firstPollId} />
        <hr />
        <h5>More Polls:</h5>
          <PollList polls={this.state.polls.slice(1)} />
      </div>
    );
  }
}

Home.propTypes = {

};

export default Home;