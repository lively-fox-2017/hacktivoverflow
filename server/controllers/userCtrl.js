const User = require('../models/user')

class UserCtrl {
  static aylien(req, res, next) {
    var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
      application_id: "af42a935",
      application_key: "67db5182c4f1c548618110c1722c013c"
    });
    textapi.hashtags({
      // text: req.params.text
      text: req.params.text
    }, function (err, data) {
      console.log(data)
      res.send(data)
      console.log(err)
    })
  }
  static read(req, res, next) {
    User.read().then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next) {
    User.readOne(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static create(req, res, next) {
    User.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send({
        message: '' + err
      })
    })
  }
  static update(req, res, next) {
    req.body._id = req.params.id
    User.update(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send({
        message: '' + err
      })
    })
  }
  static delete(req, res, next) {
    User.delete(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send({
        message: '' + err
      })
    })
  }
}

module.exports = UserCtrl;
