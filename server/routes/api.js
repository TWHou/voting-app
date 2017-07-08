const router = require('express').Router();

const Verify = require('./verify');
const Poll = require('../models/Poll');

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

router.post('/new', Verify.verifyUser, addPoll);

module.exports = router;