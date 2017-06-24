import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PollList from './PollList';
import NewPoll from './NewPoll';
import Poll from './Poll';

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

class Polls extends Component {
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
    let polls = this.state.polls;
    return (
      <Switch>
        <Route exact path='/polls' render={() => (<PollList polls={polls}/>)}/>
        <Route exact path='/polls/new' component={NewPoll}/>
        <Route path='/polls/:number' component={Poll}/>
      </Switch>
    );
  }
}

Polls.propTypes = {

};

export default Polls;