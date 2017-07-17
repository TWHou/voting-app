const router = require('express').Router();

const Verify = require('./verify');
const Poll = require('../models/Poll');
const User = require('../models/User');

const getUser = (req, res, next) => {
  const id = req.payload._id;
  User.findById(id, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

const addPoll = (req, res, next) => {
  const id = req.payload._id;
  let newPoll = new Poll({
    title: req.body.title,
    options: req.body.options,
    user: id
  });
  newPoll.save((err, poll)=>{
    if (err) {
      return next(err);
    }
    res.status(200).send({message: 'New Poll Created!', poll: poll});
  });
};

const getUserPolls = (req, res, next) => {
  const id = req.payload._id;
  Poll.find({user: id})
    .sort('-createdAt')
    .exec((err, polls) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({polls: polls});
    });
};

const getPolls = (req, res, next) => {
  Poll.find({})
    .sort('-createdAt')
    .exec((err, polls) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({polls: polls});
    });
};

const getPoll = (req, res, next) => {
  if (req.params.pollId !== 'undefined') {
    Poll.findById(req.params.pollId, (err, poll) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({poll: poll});
    });
  }
};

const textPrep = (text) => {
  return text.replace(/\W/g, '').toLowerCase();
};

const vote = (req, res, next) => {
  Poll.findById(req.params.pollId, (err, poll) => {
    if (err) {
      return next(err);
    }
    const index = poll.options.findIndex(
      (option) => textPrep(option.name) === textPrep(req.body.vote)
    );
    if (index > -1) {
      poll.options[index].votes++;
    } else {
      poll.options.push({name: req.body.vote, votes: 1});
    }
    poll.save((err, poll) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({poll: poll});
    });
  });
};

const deletePoll = (req, res, next) => {
  Poll.findByIdAndRemove(req.params.pollId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

router.get('/isloggedin', Verify.verifyUser, getUser);
router.get('/user', Verify.verifyUser, getUserPolls);
router.get('/polls', getPolls);
router.get('/poll/:pollId', getPoll);
router.post('/new', Verify.verifyUser, addPoll);
router.post('/vote/:pollId', vote);
router.delete('/delete/:pollId', Verify.verifyUser, deletePoll);

module.exports = router;