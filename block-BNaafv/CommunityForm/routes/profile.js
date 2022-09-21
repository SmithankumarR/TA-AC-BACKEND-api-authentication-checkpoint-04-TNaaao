var express = require('express');
var auth = require('../middleware/auth');
var Profile = require('../models/Profile');
var User = require('../models/User');

var router = express.Router();


//get profile information

router.get('/:username', auth.isLoggedIn, async (req, res, next) => {
  let givenUsername = req.params.username;

  try {
    let profile = await Profile.findOne({ username: givenUsername });
    if (!profile) {
      return res.status(400).json({ error: 'invalid username' });
    }

    res.json({ profile: await profile.profileJson() });
  } catch (error) {
    next(error);
  }
});

//update profile information

router.put('/:username', auth.isLoggedIn, async (req, res, next) => {
  let givenUsername = req.params.username;

  try {
    let data = req.body;
    let updatedProfile = await Profile.findOneAndUpdate(
      { username: givenUsername },
      data
    );

    let updatedUser = await User.findOneAndUpdate(
      { username: givenUsername },
      data
    );

    res.json({ profile: await updatedProfile.profileJson() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
