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
  },
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author"
    }
  },
  {
    $unwind: '$author'
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
          res.status(200).json(questions[0]);
        }
      });

  }

  static create (req, res) {

    Question
      .create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        voter: []
      })
      .then((question) => {
        res.status(201).json(question);
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static update (req, res) {

    Question
      .findOne({ slug: req.params.slug })
      .then((question) => {
        if (!question) {
          res.status(404).json({});
        } else {

          Question
              .updateOne(
                { slug: req.params.slug },
                {
                  title: req.body.title,
                  content: req.body.content
                },
                { runValidators: true }
              )
              .then((response) => {
                res.status(200).json(question);
              })
              .catch((err) => {
                res.status(400).json(err);
              });

        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static delete (req, res) {

    Question
      .findOne({ slug: req.params.slug })
      .then((question) => {
        if (!question) {
          res.status(404).json({});
        } else {

          Question
            .deleteOne({ slug: req.params.slug })
            .then((response) => {
              res.status(200).json(question);
            })
            .catch((err) => {
              res.status(400).json(err);
            });

        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static vote (req, res) {

    Question
      .findOne({ slug: req.body.slug })
      .then((question) => {

        if (!question) {
          res.status(404).json({});
        } else {

          if (question.voter.indexOf(req.body.user_id) === -1) {

            Question
              .updateOne(
                { slug: req.body.slug },
                { $push: { voter: req.body.user_id } }
              )
              .then((response) => {
                res.status(200).json(question);
              })
              .catch((err) => {
                res.status(400).json(err);
              });

          } else {

            res.status(400).json({
              error: 'User voted on this question'
            });

          }

        }

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static unvote (req, res) {

    Question
      .findOne({ slug: req.body.slug })
      .then((question) => {

        if (!question) {
          res.status(404).json({});
        } else {

          if (question.voter.indexOf(req.body.user_id) !== -1) {

            Question
              .updateOne(
                { slug: req.body.slug },
                { $pull: { voter: req.body.user_id } }
              )
              .then((response) => {
                res.status(200).json(question);
              })
              .catch((err) => {
                res.status(400).json(err);
              });

          } else {

            res.status(400).json({
              error: 'This user haven\'t vote on this question'
            });

          }

        }

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

}

module.exports = QuestionController;
