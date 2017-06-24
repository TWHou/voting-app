import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poll from './Poll';
import PollList from './PollList';

const FAKEDATA = [
  {
    title: 'Favorite Color',
    options: [
      {
        name: 'Blue',
        votes: 3
      },{
        name: 'Green',
        votes: 7
      }
    ],
    user: 1
  },{
    title: 'Best Movie',
    options: [
      {
        name: 'Casablanca',
        votes: 5
      },{
        name: 'Schindler\'s List',
        votes: 12
      }
    ],
    user: 2
  },{
    title: 'Preferred Framework',
    options: [
      {
        name: 'Angular',
        votes: 6
      },{
        name: 'React',
        votes: 6
      }
    ],
    user: 3
  }
];

class Home extends Component {
  constructor(props){
    super(props);
    this.getPolls = this.getPolls.bind(this);
    this.state = {
      polls: []
    };
  }

  getPolls(){
    this.setState({
      polls: FAKEDATA
    });
  }

  componentWillMount() {
    this.getPolls();
  }
  

  render() {
    return (
      <div>
        <h3>Latest Poll:</h3>
        <Poll {...this.state.polls[0]} />
        <hr />
        <h3>More Polls:</h3>
          <PollList polls={this.state.polls.slice(1)} />
      </div>
    );
  }
}

Home.propTypes = {

};

export default Home;