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

const getPoll = (req, res) => {
  if (req.params.pollId !== 'undefined') {
    Poll.findById(req.params.pollId, (err, poll) => {
      if (err) {
        res.status(500).send({error: err});
      }
      res.status(200).send({poll: poll});
    });
  }
};

const vote = (req, res) => {
  Poll.findById(req.params.pollId, (err, poll) => {
    if (err) {
      res.status(500).send({error: err});
    }
    if (req.body.new) {
      poll.options.push({name: req.body.vote, votes: 1});
    } else {
      poll.options.forEach((option) => {
        if (option.name === req.body.vote) {
          option.votes++;
        }
      });
    }
    poll.save((err, poll) => {
      if (err) {
        res.status(500).send({error: err});
      }
      res.status(200).send({poll: poll});
    });
  });
};

router.get('/isloggedin', Verify.verifyUser, getUser);
router.get('/polls', getPolls);
router.get('/poll/:pollId', getPoll);
router.post('/new', Verify.verifyUser, addPoll);
router.post('/vote/:pollId', vote);

module.exports = router;