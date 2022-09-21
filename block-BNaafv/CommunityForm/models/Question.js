var mongoose = require('mongoose');
var slugger = require('slugger');

var Schema = mongoose.Schema;
var questionSchema = new Schema(
  {
    title: { type: String, unique: true, require: true },
    description: String,
    slug: String,
    author: { type: mongoose.Types.ObjectId, ref: 'Profile' },
    upVoteCount: { type: Number, default: 0 },
    upVoteBy: { type: mongoose.Types.ObjectId, ref: 'Profile' },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: String }],
    answers: [{ type: mongoose.Types.ObjectId, ref: 'Answer' }],
  },
  {
    timestamps: true,
  }
);

questionSchema.pre('save', function (next) {
  this.slug = slugger(this.title);
  next();
});

module.exports = mongoose.model('Question', questionSchema);
