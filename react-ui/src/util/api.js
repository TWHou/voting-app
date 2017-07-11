import axios from 'axios';

const api = {};

api.getPolls = () => {
  return axios.get('/api/polls')
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

export default api;