import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import VoteForm from './VoteForm';

class Poll extends Component {

  handleVote = (vote) => {
    console.info(vote);
  }

  render() {
    const randColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
    const options = this.props.options.reduce((obj, item) => {
      obj.labels.push(item.name);
      obj.datasets[0].data.push(item.votes);
      obj.datasets[0].backgroundColor.push(randColor());
      return obj;
    }, {labels:[],datasets:[{data:[], backgroundColor:[]}]});
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className="row">
          <VoteForm className="col" onVote={this.handleVote} options={options.labels} />
          <div className="col">
            <Polar data={options} />
          </div>
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

Poll.defaultProps = {
  title: '',
  options: []
};

export default Poll;