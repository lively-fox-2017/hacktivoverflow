const Answer = require('../models/answer')
class AnswerCtrl {
  static readOneByQuestionId (req, res, next) {
    Answer.readOneByQuestionId(req.params.question_id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readByUser (req, res, next) {
    Answer.readByUser(req.params.user_id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static upVote (req, res, next) {
    Answer.upVote(req.params.id, req.body.user).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static downVote (req, res, next) {
    Answer.downVote(req.params.id, req.body.user).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static create (req, res, next) {
    Answer.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static update (req, res, next) {
    req.body._id = req.params.id
    Answer.update(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) =>{
      res.status(500).send(err)
    })
  }
  static delete (req, res, next) {
    Answer.delete(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = AnswerCtrl;
