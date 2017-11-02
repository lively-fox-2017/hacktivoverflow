var idvalidator = require('mongoose-id-validator')
var jwtDecoder = require('../helpers/jwtDecodeHelper')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var Schema = mongoose.Schema
var ObjectId = mongoose.Types.ObjectId;
var connectionUrl = 'mongodb://localhost/hacktivoverflow_dev'
mongoose.connect(connectionUrl, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

var answerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
})

answerSchema.plugin(idvalidator)

var Answer = mongoose.model('Answer', answerSchema)

class Model {
  static create(insert) {
    return new Promise((resolve, reject) => {
      insert.posted_by = jwtDecoder(insert.posted_by)
      Answer.create({
        answer: insert.answer,
        posted_by: insert.posted_by,
        upvote: [],
        downvote: [],
        question_id: insert.question_id
      }).then((data) => {
        resolve({
          message: 'Create Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    return new Promise((resolve, reject) => {
      Answer.findOneAndUpdate({
        "_id": update._id
      }, update, {
        new: true
      }).then((data) => {
        resolve({
          message: 'Update Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      Answer.findOneAndRemove({
        "_id": id
      }).then((data) => {
        resolve({
          message: 'Delete Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOneByQuestionId(question_id) {
    return new Promise((resolve, reject) => {
      Answer.aggregate([{
        $project: {
          answer: 1,
          created_at: 1,
          posted_by: 1,
          question_id: 1,
          upvote: 1,
          downvote: 1,
          upvotes: {
            $size: "$upvote"
          },
          downvotes: {
            $size: "$downvote"
          },
          votes: {
            $subtract: [{
              $size: "$upvote"
            }, {
              $size: "$downvote"
            }]
          },
        }
      }, {
        $match: {
          "question_id": new ObjectId(question_id)
        }
      },{
        $sort: {
          votes: -1,
          created_at: -1,
        }
      }]).then((data) => {
        if (data.length) {
          Answer.populate(data, {
            path: "posted_by upvote.user downvote.user"
          }, function(err, populated) {
            resolve({
              message: 'Data Found',
              data: populated
            })
          })
        } else {
          reject({
            message: 'Data Not Found'
          })
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static upVote(id, user) {
    return new Promise((resolve, reject) => {
      user = jwtDecoder(user)
      Answer.findOne({
        "_id": id
      }).then((answer) => {
        if (answer.upvote.indexOf(user) > -1) {
          reject({
            err: 'Already UpVote this'
          })
        } else if (answer.downvote.indexOf(user) > -1) {
          Answer.findOneAndUpdate({
            "_id": id
          }, {
            $push: {
              upvote: user
            },
            $pull: {
              downvote: user
            }
          }, {
            new: true
          }).then((data) => {
            resolve({
              message: 'UpVote Success',
              data
            })
          }).catch((err) => {
            reject(err)
          })
        } else {
          Answer.findOneAndUpdate({
            "_id": id
          }, {
            $push: {
              upvote: user
            }
          }, {
            new: true
          }).then((data) => {
            resolve({
              message: 'UpVote Success',
              data
            })
          }).catch((err) => {
            reject(err)
          })
        }
      })
    })
  }
  static downVote(id, user) {
    return new Promise((resolve, reject) => {
      user = jwtDecoder(user)
      Answer.findOne({
        "_id": id
      }).then((answer) => {
        if (answer.downvote.indexOf(user) > -1) {
          reject({
            err: 'Already DownVote this'
          })
        } else if (answer.upvote.indexOf(user) > -1) {
          Answer.findOneAndUpdate({
            "_id": id
          }, {
            $push: {
              downvote: user
            },
            $pull: {
              upvote: user
            }
          }, {
            new: true
          }).then((data) => {
            resolve({
              message: 'DownVote Success',
              data
            })
          }).catch((err) => {
            reject(err)
          })
        } else {
          Answer.findOneAndUpdate({
            "_id": id
          }, {
            $push: {
              downvote: user
            }
          }, {
            new: true
          }).then((data) => {
            resolve({
              message: 'DownVote Success',
              data
            })
          }).catch((err) => {
            reject(err)
          })
        }
      })
    })
  }
}

module.exports = Model;
