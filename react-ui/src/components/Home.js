import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poll from './Poll';
import PollList from './PollList';

class Home extends Component {
  render() {
    return (
      <div>
        <h5>Latest Poll:</h5>
        {this.props.polls[0] && (
          <Poll pollId={this.props.polls[0]._id} />
        )}
        <hr />
        <h5>More Polls:</h5>
          <PollList polls={this.props.polls.slice(1)} />
      </div>
    );
  }
}

Home.propTypes = {
  polls: PropTypes.array
};

export default Home;