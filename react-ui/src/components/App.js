import React, { Component } from 'react';

import Header from './Header.js';
import Main from './Main.js';

class App extends Component {
  state = {
    username: 'user'
  }
  render() {
    return (
      <div>
        <Header username={this.state.username} />
        <Main />
      </div>
    );
  }
}

export default App;
