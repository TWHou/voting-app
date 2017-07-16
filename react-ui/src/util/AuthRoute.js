import React, { Component } from 'react';
import { Route , Redirect  } from 'react-router-dom';
import PropTypes from 'prop-types';

class AuthRoute extends Component {

  isAuthed = () => localStorage.getItem('token') ? true : false

  render() {
    const {component: Component, path, ...rest} = this.props;
    return (
      <Route path={path} render={(props) => (
        this.isAuthed() ? ( 
          <Component {...rest}/>
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
  component: PropTypes.func,
  path: PropTypes.string
};

export default AuthRoute;