let express = require('express')
let router = express.Router()
let user = require('../controllers/user-controllers')
// let helper = require('../helpers/helper.js')

router.get('/',user.getUser)
router.post('/',user.addUser)
router.get('/profile',user.findUser)
router.put('/:id',user.editUser)
router.delete('/:id',user.deleteUser)
router.post('/login',user.loginUser)

module.exports = router
