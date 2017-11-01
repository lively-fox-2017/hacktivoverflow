const express = require('express')
const router = express.Router()
const AnswerCtrl = require('../controllers/AnswerCtrl')

router.get('/', AnswerCtrl.read)
router.get('/:id', AnswerCtrl.readOne)
router.put('/upvote/:id', AnswerCtrl.upVote)
router.put('/downvote/:id', AnswerCtrl.downVote)
router.post('/', AnswerCtrl.create)
router.put('/:id', AnswerCtrl.update)
router.delete('/:id', AnswerCtrl.delete)

module.exports = router;
