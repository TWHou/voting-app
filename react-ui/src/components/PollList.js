import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import Poll from './Poll';

class PollList extends Component {
  render() {
    return (
      <div>
        {this.props.polls.map(poll =>
          <h2 key={poll.title}>
            {poll.title}
          </h2>
        )}
      </div>
    );
  }
}

PollList.propTypes = {
  polls: PropTypes.array.isRequired
};

export default PollList;