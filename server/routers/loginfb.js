let express = require('express')
let router = express.Router()
let fblogin = require('../controllers/loginfb')
// let helper = require('../helpers/helper.js')

router.post('/',fblogin.loginfb)

module.exports = router
