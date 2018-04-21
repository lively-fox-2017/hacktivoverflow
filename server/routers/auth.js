const express = require('express')
const router = express.Router()
const AuthCtrl = require('../controllers/authCtrl')

router.post('/login', AuthCtrl.doLogin)
router.post('/register', AuthCtrl.doRegister)
router.post('/loginFb', AuthCtrl.loginFb)

module.exports = router;
