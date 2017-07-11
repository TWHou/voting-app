const router = require('express').Router();

const Verify = require('./verify');
const Poll = require('../models/Poll');
const User = require('../models/User');

const getUser = (req, res) => {
  const id = req.payload._id;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(err.status).send({error: err});
    }
    res.send(user);
  });
};

const addPoll = (req, res) => {
  const id = req.payload._id;
  let newPoll = new Poll({
    title: req.body.title,
    options: req.body.options,
    user: id
  });
  newPoll.save((err, poll)=>{
    if (err) {
      res.status(500).send({error: err});
    }
    res.status(200).send({message: 'New Poll Created!', poll: poll});
  });
};

const getPolls = (req, res) => {
  Poll.find({}, (err, polls) => {
    if (err) {
      res.status(500).send({error: err});
    }
    res.status(200).send({polls: polls});
  });
};

router.get('/isloggedin', Verify.verifyUser, getUser);
router.post('/new', Verify.verifyUser, addPoll);
router.get('/polls', getPolls);

module.exports = router;