import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import VoteForm from './VoteForm';
import api from '../util/api';

class Poll extends Component {

  state = {
    _id: '',
    title: '',
    options: [],
    user: ''
  }

  getPoll = (pollId) => {
    api.getPoll(pollId).then((poll) => {
      this.setState({ ...poll });
    });
  }

  handleVote = (vote, newOpt=false) => {
    api.vote(vote, this.state._id, newOpt)
    .then((poll) => {
      this.setState({ ...poll });
    });
  }

  componentDidMount() {
    if (this.props.match) {
      this.getPoll(this.props.match.params.number);
    }
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.pollId) {
      const pollId = nextProps.pollId;
      this.getPoll(pollId);
    }
  }
  
  render() {
    const randColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
    const options = this.state.options.reduce((obj, item) => {
      obj.labels.push(item.name);
      obj.datasets[0].data.push(item.votes);
      obj.datasets[0].backgroundColor.push(randColor());
      return obj;
    }, {labels:[],datasets:[{data:[], backgroundColor:[]}]});
    return (
      <div>
        <h2>{this.state.title}</h2>
        <div className="row flex-nowrap justify-content-around align-items-center">
          <VoteForm className="col-6" onVote={this.handleVote} options={options.labels} />
          <div className="col-6">
            <Polar data={options} />
          </div>
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  match: PropTypes.object,
  pollId: PropTypes.string
};

export default Poll;