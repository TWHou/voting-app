const router = require('express').Router();
const passport = require('passport');

const User = require('../models/User');
const Verify = require('./verify');

const signup = function(req, res){
  if (req.body.username.length < 2) {
    return res.json({err: 'username must be longer than 3 characters'});
  }
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    function(err, user){
      if (err) {
        return res.status(500).json({err: err});
      }
      passport.authenticate('local')(req, res, function(){
        return res.status(200).json({
          status: 'Registration Successful!',
          user: user
        });
      });
    }
  );
};

const login = function(req, res){
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err){
      if (err) {
        return res.status(500).json({err: err});
      }
      const token = Verify.getToken({
        'username': user.username,
        '_id': user._id
      });
      res.status(200).json({
        status: 'Log in successful.',
        success: true,
        token: token
      });
    });
  })(req, res);
};

const logout = function(req, res) {
  req.logout();
  res.status(200).json({status: 'Logout successful.'});
};

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;