import axios from 'axios';

const api = {};

api.getPolls = () => {
  return axios.get('/api/polls')
  .then((res) => res.data.polls);
};

export default api;