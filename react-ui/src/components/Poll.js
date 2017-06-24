import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Poll extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.options.map(option =>
          <p key={option.name}>
            {option.name}
          </p>
        )}
      </div>
    );
  }
}

Poll.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default Poll;