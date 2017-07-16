import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PollList extends Component {
  render() {
    return (
      <div className="list-group">
        {this.props.polls.map(poll =>
          <Link
            key={poll._id}
            to={`/poll/${poll._id}`}
            className="list-group-item list-group-item-action"
          >
            {poll.title}
          </Link>
        )}
      </div>
    );
  }
}

PollList.propTypes = {
  polls: PropTypes.array.isRequired
};

export default PollList;