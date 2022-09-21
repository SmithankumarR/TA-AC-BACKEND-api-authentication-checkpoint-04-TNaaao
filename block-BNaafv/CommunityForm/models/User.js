var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Profile = require('../models/Profile');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String,
    userName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    bio: String,
    image: String,
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    profile: { type: mongoose.Types.ObjectId, ref: 'Profile' },
    questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
    answers: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
// hash password
userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    var profileData = {
      name: this.name,
      userName: this.userName,
      bio: this.bio,
      image: this.image,
      isAdmin: this.isAdmin,
      isBlocked: this.isBlocked,
    };
    var createdProfile = await Profile.create(profileData);
    this.profile = createdProfile.id;
    next();
  } catch (error) {
    next(error);
  }
});
// check for correct password
userSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};
// create a token
userSchema.methods.createToken = async function () {
  try {
    var profile = await Profile.findById(this.profile);
    var profileData = {
      name: profile.name,
      userName: profile.userName,
      bio: profile.bio,
      image: profile.image,
    };
    // var user = await User.findOne({ userName: profile.userName });
    // if (user.isAdmin) {
    //   profileData.isAdmin = true;
    // } else {
    //   profileData.isAdmin = false;
    // }

    var token = await jwt.sign(profileData, process.env.SECRET);
    return token;
  } catch (error) {
    return error;
  }
};
// required data form user
userSchema.methods.userJson = async function (token) {
  var data = {
    email: this.email,
    userName: this.userName,
    token: token,
  };
  return data;
};

module.exports = mongoose.model('User', userSchema);
