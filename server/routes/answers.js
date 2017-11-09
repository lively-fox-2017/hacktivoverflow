const express = require('express');
const router = express.Router();

const AnswerController = require('../controllers/AnswerController');

// Answer REST API
router.get('/', AnswerController.fetchAll);
router.get('/:id', AnswerController.fetchById);
router.post('/', AnswerController.create);
router.put('/:id', AnswerController.update);
router.delete('/:id', AnswerController.delete);

// Answer Vote and Un-vote
router.patch('/vote', AnswerController.vote);
router.patch('/unvote', AnswerController.unvote);

// Get answers by question_id
router.get('/question/:question_id', AnswerController.fetchByQuestionId);

module.exports = router;
