var jwt = require('jsonwebtoken')
function decoder (token) {
  var decoded = jwt.verify(token, process.env.JWT_KEY);
  return decoded._id
}

module.exports = decoder;
