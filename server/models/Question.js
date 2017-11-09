require('dotenv').config();
const mongoose = require('mongoose');
const slug = require('slug');

const Answer = require('./Answer');

mongoose.connection.openUri(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  slug: {
    type: String,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  voter: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

QuestionSchema.pre('save', function (next) {

  const questionSlug = slug(this.title, { lower: true });

  mongoose.model('Question', QuestionSchema)
    .find({ slug: { $regex: '.*' + questionSlug + '.*' } })
    .then((questions) => {
      if (questions.length) {
        this.slug =  questionSlug + '-' + questions.length.toString();
      } else {
        this.slug = questionSlug;
      }
      next();
    })
    .catch((err) => {
      console.error(err);
    });

});

module.exports = mongoose.model('Question', QuestionSchema);
