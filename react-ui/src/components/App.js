import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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
      if (res.status==='200') {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.setState({username: ''});
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
          <Route path='/polls' render={({ history }) => <Polls history={history} />}/>
          <Route path='/user' component={User}/>
          <Route path='/login' render={() => (
            this.state.username ? (<Redirect to="/" />) : ( 
              <Login onLogin={this.doLogin} /> 
            ))}/>
          <Route path='/logout' 
            render={({ history }) => (
              this.state.username ? (
                <Logout onLogout={this.doLogout} history={history} />
              ) : (<Redirect to="/" />)
            )}
          />
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
