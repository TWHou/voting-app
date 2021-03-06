import axios from 'axios';

const api = {};

api.getPolls = () => {
  return axios.get('/api/polls')
  .then((res) => res.data.polls);
};

api.getUserPolls = (token) => {
  return axios.get('/api/user', {headers: {'Authorization': token}})
  .then((res) => res.data.polls);
};

api.getPoll = (pollId) => {
  return axios.get(`/api/poll/${pollId}`)
  .then((res) => res.data.poll);
};

api.vote = (vote, pollId) => {
  return axios.post(`/api/vote/${pollId}`, {vote: vote})
  .then((res) => res.data.poll);
};

api.newPoll = (poll, token) => {
  return axios.post('/api/new', poll, {headers: {'Authorization': token}})
  .then((res) => res.data.poll);
};

api.delete = (pollId, token) => {
  return axios.delete(`/api/delete/${pollId}`, {headers: {'Authorization': token}})
  .then((res) => res);
};

export default api;