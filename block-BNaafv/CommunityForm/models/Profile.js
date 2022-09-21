let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let profileSchema = new Schema({
  username: { type: String, unique: true, require: true },
  name: { type: String },
  bio: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  upVotedQuestions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
  upVotedAnswers: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
});

profileSchema.methods.profileJson = async function () {
  let data = {
    name: this.name,
    username: this.username,
    bio: this.bio,
    image: this.image,
    isAdmin: this.isAdmin,
    isBlocked: this.isBlocked,
  };
  return data;
};

module.exports = mongoose.model('Profile', profileSchema);
