const Question = require('../models/question')
const helper = require('../helpers/helper')

module.exports = {
  findAll: (req, res) => {
    Question.aggregate([
      {
        $project: {
          user: 1,
          title: 1,
          question: 1,
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
          message: "Berhasil Tampil Questions",
          data: result
        })
      }
    })
  },

  findMyPost: (req, res) => {
    Question.find({user: req.params.userid}).sort('createdAt').then((myQuestions) => {
      res.status(200).json({
        message: "Berhasil Tampil Your Questions",
        data: myQuestions
      })
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)
    // let userId = helper.tokenDecode(req.body.token)
	   // console.log(req.headers.token)
    Question.create(helper.dataQuestion(req.body, userId)).then((createdQuestion) => {
      res.status(200).json({
        message: "Berhasil Tambah Question",
        data: createdQuestion
      })
    }).catch((reason) => {
      message: reason
    })
  },

  vote: (req, res) => {
    let userId = helper.tokenDecode(req.headers.token)
    // let userId = helper.tokenDecode(req.body.token)
    // console.log(userId);
    Question.findOne({_id: req.params.id}).then((question) => {
      // console.log(question.voters.indexOf(userId));
      if (question.user == userId) {
        // console.log(question.user + "------------------" + userId);
        res.status(401).json({
          message: "Maaf Tidak Bisa Memvote Pertannyaan sendiri"
        })
      } else {
        if (question.voters.indexOf(userId) === -1) {
          Question.update({_id: req.params.id}, {$push: { voters: userId }}).then(() => {
            res.status(200).json({
              message: "Berhasil Up Vote"
            })
          }).catch((reason) => {
            res.status(404).json({
              message: reason
            })
          })
        } else {
          Question.update({_id: req.params.id}, {$pull: { voters: userId }}).then(() => {
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
    // let userId = helper.tokenDecode(req.body.token)

    Question.findOne({_id: req.params.id}).then((question) => {

      if (question.user == userId) {
        Question.update({_id: req.params.id}, {
          $set: {
            title: req.body.title,
            question: req.body.question,
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
    // let userId = helper.tokenDecode(req.body.token)

    Question.findOne({_id: req.params.id}).then((question) => {

      if (question.user == userId) {
        Question.remove({_id: req.params.id}).then((result) => {
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
