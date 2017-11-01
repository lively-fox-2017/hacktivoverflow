const mongoose = require('mongoose');

const Question = require('../models/Question');

const questionQuery = [
  {
    $project: {
      title: 1,
      content: 1,
      slug: 1,
      created_at: 1,
      author: 1,
      votes: {
        $size: "$voter"
      },
      voted: null
    }
  },
  {
    $sort: {
      votes: -1,
      created_at: -1
    }
  }
];

class QuestionController {

  static fetchAll (req, res) {

    const userId = req.query.user_id ?
                   new mongoose.mongo.ObjectId(req.query.user_id) :
                   null;

    questionQuery[0].$project.voted = {
      $cond: [
        { $in: [ userId, "$voter" ] },
        true,
        false
      ]
    };

    Question
      .aggregate(questionQuery, function (err, questions) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(questions);
        }
      });

  }

  static fetchBySlug (req, res) {

    const userId = req.query.user_id ?
                   new mongoose.mongo.ObjectId(req.query.user_id) :
                   null;

    questionQuery[0].$project.voted = {
      $cond: [
        { $in: [ userId, "$voter" ] },
        true,
        false
      ]
    };

    questionQuery.push({ $match: { slug: req.params.slug } });

    Question
      .aggregate(questionQuery, function (err, questions) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(questions);
        }
      });

  }

  static create (req, res) {



  }

  static update (req, res) {

  }

  static delete (req, res) {

  }

  static vote (req, res) {

  }

  static unvote (req, res) {

  }

}

module.exports = QuestionController;
