import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

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

  doRegister = user => {
    axios.post('/auth/signup', user)
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.setState({username: user.username});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  doLogin = user => {
    axios.post('auth/login', user)
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.setState({username: user.username});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="container">
        <Header username={this.state.username} />
        <main>
          <Route exact path='/' component={Home}/>
          <Route path='/polls' component={Polls}/>
          <Route path='/user' component={User}/>
          <Route path='/login' render={() => (
            this.state.username ? (<Redirect to="/" />) : ( 
              <Login onLogin={this.doLogin} /> 
            ))}/>
          <Route path='/logout' component={Logout}/>
          <Route
            path='/register'
            render={() => (
              this.state.username ? (<Redirect to="/" />) : (
                <Register 
                  onRegister={this.doRegister}
                  usererr={this.state.usererr} 
                />
              )
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
