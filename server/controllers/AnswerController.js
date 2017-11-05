const mongoose = require('mongoose');

const Answer = require('../models/Answer');

const answerQuery = [
  {
    $project: {
      content: 1,
      created_at: 1,
      by: 1,
      question: 1,
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
      localField: "by",
      foreignField: "_id",
      as: "by"
    }
  },
  {
    $unwind: '$by'
  }
];

class AnswerController {

  static fetchAll (req, res) {

    const userId = req.query.user_id ?
                   new mongoose.mongo.ObjectId(req.query.user_id) :
                   null;

    answerQuery[0].$project.voted = {
      $cond: [
        { $in: [ userId, "$voter" ] },
        true,
        false
      ]
    };

    // Remove all $match, just in case if there's any
    answerQuery.splice(4);

    Answer
      .aggregate(answerQuery, function (err, answers) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(answers);
        }
      });

  }

  static fetchById (req, res) {

    const userId = req.query.user_id ?
                   new mongoose.mongo.ObjectId(req.query.user_id) :
                   null;

    answerQuery[0].$project.voted = {
      $cond: [
        { $in: [ userId, "$voter" ] },
        true,
        false
      ]
    };

    // Remove all $match, just in case if there's any
    answerQuery.splice(4);

    answerQuery.push({ $match: { _id: new mongoose.mongo.ObjectId(req.params.id) } });

    Answer
      .aggregate(answerQuery, function (err, answers) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(answers[0]);
        }
      });

  }

  static fetchByQuestionId (req, res) {

    const userId = req.query.user_id ?
                   new mongoose.mongo.ObjectId(req.query.user_id) :
                   null;

    answerQuery[0].$project.voted = {
      $cond: [
        { $in: [ userId, "$voter" ] },
        true,
        false
      ]
    };

    // Remove all $match, just in case if there's any
    answerQuery.splice(4);

    answerQuery.push({ $match: { question: new mongoose.mongo.ObjectId(req.params.question_id) } });

    Answer
      .aggregate(answerQuery, function (err, answers) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(answers);
        }
      });

  }

  static create (req, res) {

    Answer
      .create({
        content: req.body.content,
        by: new mongoose.mongo.ObjectId(req.body.by),
        question: new mongoose.mongo.ObjectId(req.body.question_id),
        voter: []
      })
      .then((answer) => {
        res.status(201).json(answer);
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static update (req, res) {

    Answer
      .findOne({ _id: req.params.id })
      .then((answer) => {
        if (!answer) {
          res.status(404).json({});
        } else {

          Answer
              .updateOne(
                { _id: req.params.id },
                {
                  content: req.body.content
                },
                { runValidators: true }
              )
              .then((response) => {
                res.status(200).json(answer);
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

    Answer
      .findOne({ _id: req.params.id })
      .then((answer) => {
        if (!answer) {
          res.status(404).json({});
        } else {

          Answer
            .deleteOne({ _id: req.params.id })
            .then((response) => {
              res.status(200).json(answer);
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

    Answer
      .findOne({ _id: req.body.id })
      .then((answer) => {

        if (!answer) {
          res.status(404).json({});
        } else {

          if (answer.voter.indexOf(req.body.user_id) === -1) {

            Answer
              .updateOne(
                { _id: req.body.id },
                { $push: { voter: req.body.user_id } }
              )
              .then((response) => {
                res.status(200).json(answer);
              })
              .catch((err) => {
                res.status(400).json(err);
              });

          } else {

            res.status(400).json({
              error: 'You voted on this answer already'
            });

          }

        }

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

  static unvote (req, res) {

    Answer
      .findOne({ _id: req.body.id })
      .then((answer) => {

        if (!answer) {
          res.status(404).json({});
        } else {

          if (answer.voter.indexOf(req.body.user_id) !== -1) {

            Answer
              .updateOne(
                { _id: req.body.id },
                { $pull: { voter: req.body.user_id } }
              )
              .then((response) => {
                res.status(200).json(answer);
              })
              .catch((err) => {
                res.status(400).json(err);
              });

          } else {

            res.status(400).json({
              error: 'You haven\'t vote on this question yet'
            });

          }

        }

      })
      .catch((err) => {
        res.status(400).json(err);
      });

  }

}

module.exports = AnswerController;
