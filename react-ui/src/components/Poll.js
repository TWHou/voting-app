import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import VoteForm from './VoteForm';

class Poll extends Component {

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
          <VoteForm className="col" onVote={this.props.onVote} options={options.labels} />
          <div className="col">
            <Polar data={options} />
          </div>
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  onVote: PropTypes.func.isRequired,
  title: PropTypes.string,
  options: PropTypes.array,
  _id: PropTypes.string
};

Poll.defaultProps = {
  title: '',
  options: []
};

export default Poll;