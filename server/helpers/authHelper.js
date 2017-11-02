var jwtDecoder = require('../helpers/jwtDecodeHelper')
var jwt = require('jsonwebtoken')

function authorized(req, res, next) {
  if(req.headers.token) {
    if(jwtDecoder(req.headers.token)) {
      next()
    } else {
      res.status(401).send({message: 'Not Authorized to access routes'})
    }
  } else {
    res.status(401).send({message: 'Not Authorized to access routes'})
  }
}

module.exports = authorized;
