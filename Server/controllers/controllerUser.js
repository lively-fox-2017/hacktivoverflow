const User = require('../models/user')
const helper = require('../helpers/helper')

module.exports = {
  findAll: (req, res) => {
    User.find().sort('username').then((allUsers) => {
      res.status(200).json({
        message: "Berhasil Tampil",
        data: allUsers
      })
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  register: (req, res) => {
    let secret = helper.secretGen()
    let password = helper.secretHash(secret, req.body.password)

    User.create(helper.dataUser(req.body, secret, password)).then((userRegistered) => {
      let token = helper.tokenGen(userRegistered)
      res.status(200).json({
        message: "Berhasil Registrasi",
        token: token
      })
    }).catch((reason) => {
      res.status(404).json({
        // message: `ERROR => ${reason}`
        message: reason
      })
    })
  },

  login: (req, res) => {
    User.findOne({username: req.body.username}).then((dataUser) => {
      if (dataUser) {
        let password = helper.secretHash(dataUser.secret, req.body.password)

        if ( password === dataUser.password) {
          let token = helper.tokenGen(dataUser)

          res.status(200).json({
            message: "Berhasil Login",
            token: token
          })
        } else {
          res.status(400).json({
            message: "Invalid Password"
          })
        }
      } else {
        res.status(400).json({
          message: "Invalid Username"
        })
      }
    })
  }
}
