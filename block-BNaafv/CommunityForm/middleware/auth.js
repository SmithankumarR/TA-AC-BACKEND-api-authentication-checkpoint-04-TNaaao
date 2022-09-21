var jwt = require('jsonwebtoken');
var User = require('../models/User');

module.exports = {
  isLoggedIn: async function (req, res, next) {
    try {
      var token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ error: 'Token required' });
      } else {
        var profileData = await jwt.verify(token, process.env.SECRET);
        req.user = profileData;
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  isAdmin: async function (req, res, next) {
    try {
      var token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ error: 'Token required' });
      } else {
        var profileData = await jwt.verify(token, process.env.SECRET);
        if (!profileData.isAdmin) {
          return res.status(400).json({ error: 'You have to login as Admin' });
        }
        req.user = profileData;
        
        var user = await User.findOne({ userName: profileData.userName });
        if (user.isAdmin) {
          profileData.isAdmin = true;
        } else {
          profileData.isAdmin = false;
        }
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
