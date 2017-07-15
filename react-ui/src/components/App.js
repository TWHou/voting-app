import React, { Component } from 'react';
import { Route/* , Redirect */, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../util/auth';
import Header from './Header.js';
import Home from './Home';
import Polls from './Polls';
import User from './User';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

class App extends Component {
  state = {
    username: '',
    usererr: false
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
    })
    .catch((err) => {
      console.error(err);
    });
  }

  doLogin = (user) => {
    auth.login(user)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.id);
        this.setState({username: res.user.username});
        this.props.history.push('/');
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  doLogout = () => {
    const token = localStorage.getItem('token');
    auth.logout(token)
    .then((res) => {
      console.log(res);
      if (res.status===200) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.setState({username: ''});
        this.props.history.push('/');
      }
    })
    .catch((err) => {
      console.error(err);
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
  }
  
  render() {
    return (
      <div className="container">
        <Header username={this.state.username} />
        <main>
          <Route exact path='/' component={Home}/>
          <Route path='/polls' render={({ history }) => (
            <Polls history={history} />
          )}/>
          <Route path='/user' component={User}/>
          <Route path='/login' render={() => (
            <Login onLogin={this.doLogin} /> 
          )}/>
          <Route path='/logout' render={({ history }) => (
              <Logout onLogout={this.doLogout} history={history} />
          )}/>
          <Route path='/register' render={() => (
            <Register 
              onRegister={this.doRegister}
              usererr={this.state.usererr} 
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
