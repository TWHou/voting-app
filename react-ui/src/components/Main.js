import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Polls from './Polls';
import User from './User';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/polls' component={Polls}/>
          <Route path='/user' component={User}/>
          <Route path='/login' component={Login}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </main>
    );
  }
}

export default Main;