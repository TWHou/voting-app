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
      const result = res.data;
      if (result.token) {
        localStorage.setItem('token', result.token);
        this.setState({username: user.username});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  doLogin = user => {
    console.info('logging in.....');
    axios.post('auth/login', user)
    .then(res => {
      const result = res.data;
      console.info(result);
      if (result.token) {
        localStorage.setItem('token', result.token);
        this.setState({username: user.username});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  doLogout = () => {
    const token = localStorage.getItem('token');
    axios.get('auth/logout', {headers: {'Authorization': token}})
    .then(res => {
      console.info(res);
      if (res.status === '200') {
        localStorage.removeItem('token');
        this.setState({username: ''});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  getUser = (token) => {
    axios.get('api/isloggedin', {headers: {'Authorization': token}})
    .then(res => {
      console.info(res);
      const user = res.data;
      if (user) {
        this.setState({
          username: user.username
        });
      }
    })
    .catch(() => {
      localStorage.removeItem('token');
      this.setState({username: ''});
    });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.getUser(token);
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
