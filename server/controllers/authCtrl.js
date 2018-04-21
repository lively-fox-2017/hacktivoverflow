const User = require('../models/user')
class AuthCtrl {
  static doLogin (req, res, next) {
    User.login(req.body.username, req.body.password).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static doRegister (req, res, next) {
    User.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static loginFb (req, res, next) {
    User.loginFb(req.body.fb_id, req.body.accessToken).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = AuthCtrl;
