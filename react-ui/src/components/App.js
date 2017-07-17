import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../util/auth';
import api from '../util/api';
import AuthRoute from '../util/AuthRoute';
import Header from './Header.js';
import Home from './Home';
import PollList from './PollList';
import Poll from './Poll';
import NewPoll from './NewPoll';
import User from './User';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

class App extends Component {
  state = {
    username: '',
    regErr: {},
    loginErr: '',
    pollErr: '',
    genErr: '',
    polls: []
  }

  doRegister = (user) => {
    auth.register(user)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.id);
        this.setState({username: res.user.username});
        this.props.history.push('/');
      }
      if (res.error) {
        this.setState({regErr: res.error});
      }
    })
    .catch((err) => {
      const error = err.response.data.error;
      if (error.name === 'UserExistsError' || error.message === 'User validation failed: username: Error, expected username to be unique.') {
        this.setState({regErr: {username: 'Sorry, that username is taken. Try another?'}});
      } else {
        this.props.history.push('/', {genErr: 'Something went wrong 😢. Please try again later.'});
      }
    });
  }

  doLogin = (user, from) => {
    auth.login(user)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.id);
        this.setState({username: res.user.username});
        this.props.history.push(from);
      }
    })
    .catch((err) => {
      const msg = err.response.data.message;
      if (msg === 'Password or username are incorrect') {
        this.setState({loginErr: msg});
      } else {
        this.props.history.push('/', {genErr: 'Something went wrong 😢. Please try again later.'});
      }
    });
  }

  doLogout = () => {
    const token = localStorage.getItem('token');
    auth.logout(token)
    .then((res) => {
      if (res.status===200) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.setState({username: ''});
        this.props.history.push('/');
      }
    })
    .catch((err) => {
      this.props.history.push('/', {genErr: 'Something went wrong 😢. Please try again later.'});
    });
  }

  addPoll = (poll) => {
    const token = localStorage.getItem('token');
    api.newPoll(poll, token)
    .then((poll) => {
      this.setState((state) => ({
        polls: state.polls.concat([ poll ])
      }));
      this.props.history.push('/user');
    })
    .catch((err) => {
      const msg = err.response.data.message;
      if (msg === 'Poll validation failed: title: Error, expected title to be unique.') {
        this.setState({pollErr: 'This poll already exist, you can add your options to it.'});
      } else {
        this.props.history.push('/', {genErr: 'Something went wrong 😢. Please try again later.'});
      }
    });
  } 

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getUser(token)
      .then((user) => {
        if (user) {
          this.setState({
            username: user.username
          });
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.setState({username: ''});
      });
    }
    api.getPolls().then((polls) => {
      this.setState({polls: polls});
    });
  }
  
  render() {
    return (
      <div className="container">
        <Header username={this.state.username} />
        {this.state.genErr && (<div className="alert alert-warning">{this.state.genErr}</div>)}
        <main className="my-3">
          <Route exact path='/' render={() => (
            <Home polls={this.state.polls} />
          )}/>
          <Route path='/polls' render={() => (
            <PollList polls={this.state.polls} />
          )}/>
          <Route path='/poll/:number' component={Poll}/>
          <AuthRoute path='/newpoll' component={NewPoll} onSubmit={this.addPoll} pollErr={this.state.pollErr} />
          <AuthRoute path='/user' component={User}/>
          <Route path='/login' render={({ location }) => (
            <Login
              location={location}
              onLogin={this.doLogin}
              loginErr={this.state.loginErr}
            /> 
          )}/>
          <Route path='/logout' render={({ history }) => (
              <Logout onLogout={this.doLogout} history={history} />
          )}/>
          <Route path='/register' render={() => (
            <Register 
              onRegister={this.doRegister}
              regErr={this.state.regErr} 
            />
          )}/>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
