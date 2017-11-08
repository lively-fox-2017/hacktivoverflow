let express = require('express')
let router = express.Router()
let question = require('../controllers/question-controllers')
let helper = require('../helpers/helper.js')

router.get('/all',question.getQuestion)
router.post('/',question.addQuestion)
router.get('/:id',question.findQuestion)
// router.put('/:id',helper.authEdited,question.editQuestion)
router.put('/:id',question.editQuestion)
// router.delete('/:id',helper.authEdited,question.deleteQuestion)
router.delete('/:id',question.deleteQuestion)
router.get('/',question.getPersonalQuestion)

module.exports = router
