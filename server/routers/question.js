const express = require('express')
const router = express.Router()
const QuestionCtrl = require('../controllers/QuestionCtrl')
const AuthHelper = require('../helpers/authHelper')

router.get('/', QuestionCtrl.read)
router.get('/:id', QuestionCtrl.readOne)
router.put('/upvote/:id', AuthHelper, QuestionCtrl.upVote)
router.put('/downvote/:id', AuthHelper, QuestionCtrl.downVote)
router.post('/', AuthHelper, QuestionCtrl.create)
router.put('/:id', AuthHelper, QuestionCtrl.update)
router.delete('/:id', AuthHelper, QuestionCtrl.delete)

module.exports = router;
