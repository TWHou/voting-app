import React, { Component } from 'react';
import { Route , Redirect  } from 'react-router-dom';
import PropTypes from 'prop-types';

class AuthRoute extends Component {

  isAuthed = () => localStorage.getItem('token') ? true : false

  render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={props => (
        this.isAuthed() ? ( 
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login', 
            state: {from: props.location }
          }}/>
        )
      )}/>
    );
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func
};

export default AuthRoute;