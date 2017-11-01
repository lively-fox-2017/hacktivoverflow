const express = require('express')
const router = express.Router()
const QuestionCtrl = require('../controllers/QuestionCtrl')

router.get('/', QuestionCtrl.read)
router.get('/:id', QuestionCtrl.readOne)
router.put('/upvote/:id', QuestionCtrl.upVote)
router.put('/downvote/:id', QuestionCtrl.downVote)
router.post('/', QuestionCtrl.create)
router.put('/:id', QuestionCtrl.update)
router.delete('/:id', QuestionCtrl.delete)

module.exports = router;
