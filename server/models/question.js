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

var questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  tags: [],
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

questionSchema.plugin(idvalidator)

var Question = mongoose.model('Question', questionSchema)

class Model {
  static read() {
    return new Promise((resolve, reject) => {
      Question.aggregate([{
        $project: {
          title: 1,
          content: 1,
          created_at: 1,
          tags: 1,
          posted_by: 1,
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
        $sort: {
          votes: -1,
          created_at: -1,
        }
      }]).then((data) => {
        if (data.length) {
          Question.populate(data, {
            path: "posted_by upvote.user downvote.user"
          }, function(err, populated) {
            resolve({
              message: 'Data Found',
              data: populated
            })
          })
        } else
          reject({
            message: 'Data Not Found'
          })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Question.aggregate([{
        $project: {
          title: 1,
          content: 1,
          created_at: 1,
          tags: 1,
          posted_by: 1,
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
          "_id": new ObjectId(id)
        }
      }]).then((data) => {
        if (data.length) {
          Question.populate(data, {
            path: "posted_by upvote.user downvote.user"
          }, function(err, populated) {
            resolve({
              message: 'Data Found',
              data: populated[0]
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
  static create(insert) {
    return new Promise((resolve, reject) => {
      insert.posted_by = jwtDecoder(insert.posted_by)
      Question.create({
        title: insert.title,
        content: insert.content,
        tags: insert.tags,
        posted_by: insert.posted_by,
        upvote: [],
        downvote: []
      }).then((data) => {
        Question.populate(data, {
          path: "posted_by upvote.user downvote.user"
        }, function(err, populated) {
          resolve({
            message: 'Data Found',
            data: populated
          })
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    return new Promise((resolve, reject) => {
      Question.findOneAndUpdate({
        "_id": update._id
      }, update, {
        new: true
      }).then((data) => {
        Question.populate(data, {
          path: "posted_by upvote.user downvote.user"
        }, function(err, populated) {
          resolve({
            message: 'Data Found',
            data: populated
          })
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      Question.findOneAndRemove({
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
  static upVote(id, user) {
    return new Promise((resolve, reject) => {
      user = jwtDecoder(user)
      Question.findOne({
        "_id": id
      }).then((question) => {
        if (question.upvote.indexOf(user) > -1) {
          reject({
            err: 'Already UpVote this'
          })
        } else if (question.downvote.indexOf(user) > -1) {
          Question.findOneAndUpdate({
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
          Question.findOneAndUpdate({
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
      Question.findOne({
        "_id": id
      }).then((question) => {
        if (question.downvote.indexOf(user) > -1) {
          reject({
            err: 'Already DownVote this'
          })
        } else if (question.upvote.indexOf(user) > -1) {
          Question.findOneAndUpdate({
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
          Question.findOneAndUpdate({
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
