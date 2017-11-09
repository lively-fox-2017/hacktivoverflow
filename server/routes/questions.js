var express = require('express');
var router = express.Router();
var QuestionController = require('../controllers/questions')

router.post('/', QuestionController.addNew )
router.get('/', QuestionController.getAll )
router.get('/:questionid', QuestionController.getDetail )
// router.get('/detail/:id', QuestionController.getID )
// router.put('/:id', QuestionController.editData )
router.put('/answer/:id', QuestionController.addAnswer )
router.put('/voteup/:id', QuestionController.addVote )
router.put('/votedown/:id', QuestionController.downVote )
router.put('/voteupanswer/:id', QuestionController.addVoteAnswer )
router.put('/votedownanswer/:id', QuestionController.downVoteAnswer )
// router.put('/answer/:id', QuestionController.voteAnswer )
router.delete('/:id', QuestionController.deleteData )

module.exports = router;
 
