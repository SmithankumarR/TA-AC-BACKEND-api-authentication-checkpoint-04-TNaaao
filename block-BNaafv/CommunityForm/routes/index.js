var express = require('express');
var auth = require('../middleware/auth');
var Question = require('../models/Question');
let lodash = require('lodash');
var router = express.Router();

//get list of all tags

router.get('/tags', auth.isLoggedIn, async (req, res, next) => {
  try {
    let questions = await Question.find({});
    let arrOfTags = questions.reduce((acc, cv) => {
      acc.push(cv.tags);
      return acc;
    }, []);
    console.log(arrOfTags);
    arrOfTags = lodash.flattenDeep(arrOfTags);
    arrOfTags = lodash.uniq(arrOfTags);
    return res.json({ tags: arrOfTags });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
