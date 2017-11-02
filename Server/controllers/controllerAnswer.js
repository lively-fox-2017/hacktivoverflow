const Answer = require('../models/answer')
const helper = require('../helpers/helper')

const mongoose = require('mongoose');

module.exports = {
  findAll: (req, res) => {
    Answer.aggregate([
      {
        $match: {
          questionId: new mongoose.mongo.ObjectId(req.params.questionId)
        }
      },
      {
        $project: {
          user: 1,
          questionId: 1,
          answer: 1,
          voters: 1,
          votersCount: {
            $size: "$voters"
          },
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $sort: {
          votersCount: -1,
          createdAt: -1
        }
      }
    ]).exec(function(err, result) {
      if (err) {
        res.status(404).json({
          message: err
        })
      } else {
        res.status(200).json({
          message: "Berhasil Tampil Answer",
          data: result
        })
      }
    })
  },

  // findMyAnswer: (req, res) => {
  //   Answer.find({user: req.params.userid}).sort('createdAt').then((myQuestions) => {
  //     res.status(200).json({
  //       message: "Berhasil Tampil Your Questions",
  //       data: myQuestions
  //     })
  //   }).catch((reason) => {
  //     res.status(404).json({
  //       message: reason
  //     })
  //   })
  // },

  insert: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)
    Answer.create(helper.dataAnswer(req.body, userId, req.params.questionId)).then((createdAnswer) => {
      res.status(200).json({
        message: "Berhasil Tambah Answer",
        data: createdAnswer
      })
    }).catch((reason) => {
      message: reason
    })
  },

  vote: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)

    Answer.findOne({_id: req.params.id}).then((answer) => {

      if (answer.user == userId) {
        res.status(401).json({
          message: "Maaf Tidak Bisa Memvote Jawaban sendiri"
        })
      } else {
        if (answer.voters.indexOf(userId) === -1) {
          Answer.update({_id: req.params.id}, {$push: { voters: userId }}).then(() => {
            res.status(200).json({
              message: "Berhasil Up Vote"
            })
          }).catch((reason) => {
            res.status(404).json({
              message: reason
            })
          })
        } else {
          Answer.update({_id: req.params.id}, {$pull: { voters: userId }}).then(() => {
            res.status(200).json({
              message: "Berhasil Down Vote"
            })
          }).catch((reason) => {
            res.status(404).json({
              message: reason
            })
          })
        }
      }
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)

    Answer.findOne({_id: req.params.id}).then((answer) => {

      if (answer.user == userId) {
        Answer.update({_id: req.params.id}, {
          $set: {
            answer: req.body.answer,
            updatedAt: new Date()
          }
        }).then((result) => {
          res.status(200).json({
            message: "Berhasil Update"
          })
        }).catch((reason) => {
          res.status(404).json({
            message: reason
          })
        })
      } else {
        res.status(401).json({
          message: "Maaf, anda tidak berhak"
        })
      }
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  delete: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)

    Answer.findOne({_id: req.params.id}).then((answer) => {

      if (answer.user == userId) {
        Answer.remove({_id: req.params.id}).then((result) => {
          res.status(200).json({
            message: "Berhasil Hapus"
          })
        }).catch((reason) => {
          res.status(404).json({
            message: reason
          })
        })
      } else {
        res.status(401).json({
          message: "Maaf, anda tidak berhak"
        })
      }
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  }
}
