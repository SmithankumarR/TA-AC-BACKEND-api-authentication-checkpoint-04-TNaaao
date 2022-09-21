let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let answerSchema = new Schema(
  {
    text: { type: String, unique: true, require: true },
    author: { type: mongoose.Types.ObjectId, ref: 'Profile' },
    upvoteCount: { type: Number, default: 0 },
    upVotedBy: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
    questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

let Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
