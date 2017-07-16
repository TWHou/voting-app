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
    user: '',
    owner: false,
    confDel: false
  }

  getPoll = (pollId) => {
    api.getPoll(pollId).then((poll) => {
      this.setState({ ...poll });
      const userId = localStorage.getItem('id');
      if (this.state.user === userId) {
        this.setState({owner: true});
      }
    });
  }

  handleVote = (vote, newOpt=false) => {
    api.vote(vote, this.state._id, newOpt)
    .then((poll) => {
      this.setState({ ...poll });
    });
  }

  handleDelete = () => {
    const token = localStorage.getItem('token');
    api.delete(this.state._id, token)
    .then((res) => {
      this.props.history.push('/user');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  toggleDel = () => {
    this.setState((state) => ({
      confDel: !state.confDel
    }));
  }

  componentDidMount() {
    if (this.props.match) {
      this.getPoll(this.props.match.params.number);
    }
    if (this.props.pollId) {
      this.getPoll(this.props.pollId);
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
      <div className="d-flex flex-column justify-content-between">
        <h2>{this.state.title}</h2>
        <div className="row flex-nowrap justify-content-around align-items-center">
          <VoteForm className="col-4" onVote={this.handleVote} options={options.labels} />
          <div className="col-8">
            <Polar data={options} />
          </div>
        </div>
        {this.state.owner && (this.state.confDel ? (
            <div className="bg-warning text-white p-3 text-center rounded">
              <h4>Are you sure? This cannot be undone!</h4>
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={this.handleDelete}
              >Yes, delete this poll!</button>
              <button
                type="button"
                className="btn btn-block"
                onClick={this.toggleDel}
              >No! Please don't take my poll away.</button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={this.toggleDel}
            >Delete</button>
          ) 
        )}
      </div>
    );
  }
}

Poll.propTypes = {
  match: PropTypes.object,
  pollId: PropTypes.string,
  history: PropTypes.object
};

export default Poll;