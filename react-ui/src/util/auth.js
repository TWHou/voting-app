import axios from 'axios';

const auth = {};

auth.register = (user) => {
  return axios.post('/auth/signup', user)
  .then((res) => res.data);
};

auth.login = (user) => {
  return axios.post('auth/login', user)
  .then((res) => res.data);
};

auth.logout = (token) => {
  return axios.get('auth/logout', {headers: {'Authorization': token}})
  .then((res) => res);
};

auth.getUser = (token) => {
  return axios.get('api/isloggedin', {headers: {'Authorization': token}})
  .then((res) => res.data);
};

auth.newPoll = (poll, token) => {
  return axios.post('/auth/new', poll, {headers: {'Authorization': token}})
  .then((res) => res.data.poll);
};

export default auth;