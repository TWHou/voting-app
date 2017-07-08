const jwt = require('jsonwebtoken');

const verify = {};

verify.getToken = function(payload) {
  return jwt.sign(payload, process.env.SECRET, {expiresIn: 3600});
};

verify.verifyUser = function(req, res, next) {
  const token = req.body.token || req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, payload){
      if (err) {
        return next(err);
      } else {
        req.payload = payload;
        next();
      }
    });
  } else {
    const err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

module.exports = verify;