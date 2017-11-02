const express = require('express')
const router = express.Router()
const AnswerCtrl = require('../controllers/AnswerCtrl')
const AuthHelper = require('../helpers/authHelper')

router.get('/:question_id', AnswerCtrl.readOneByQuestionId)
router.put('/upvote/:id', AuthHelper, AnswerCtrl.upVote)
router.put('/downvote/:id', AuthHelper, AnswerCtrl.downVote)
router.post('/', AuthHelper, AnswerCtrl.create)
router.put('/:id', AuthHelper, AnswerCtrl.update)
router.delete('/:id', AuthHelper, AnswerCtrl.delete)

module.exports = router;
