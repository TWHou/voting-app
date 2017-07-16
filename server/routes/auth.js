const router = require('express').Router();
const passport = require('passport');

const User = require('../models/User');
const Verify = require('./verify');

const signup = function(req, res, next){
  if (req.body.username.length < 3) {
    return res.json({
      error: {username: 'username must be at least 3 characters.'}
    });
  }
  if (req.body.password.length < 8) {
    return res.json({
      error: {password: 'password must be at least 8 characters'}
    });
  }
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    function(err, user){
      if (err) {
        return next(err);
      }
      passport.authenticate('local')(req, res, function(){
        const token = Verify.getToken({
          'username': user.username,
          '_id': user._id
        });
        return res.status(200).json({
          status: 'Registration Successful!',
          user: {username: user.username, id: user.id},
          token: token
        });
      });
    }
  );
};

const login = function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(info);
    }
    req.logIn(user, function(err){
      if (err) {
        return res.status(err.status || 500).json({error: err});
      }
      const token = Verify.getToken({
        'username': user.username,
        '_id': user._id
      });
      res.status(200).json({
        status: 'Log in successful.',
        success: true,
        user: {username: user.username, id: user.id},
        token: token
      });
    });
  })(req, res, next);
};

const logout = function(req, res) {
  req.logout();
  res.status(200).json({status: 'Logout successful.'});
};

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;