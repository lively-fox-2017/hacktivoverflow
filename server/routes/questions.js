const express = require('express');
const router = express.Router();

const QuestionController = require('../controllers/QuestionController');

// Question REST API
router.get('/', QuestionController.fetchAll);
router.get('/:slug', QuestionController.fetchBySlug);
router.post('/', QuestionController.create);
router.put('/:slug', QuestionController.update);
router.delete('/:slug', QuestionController.delete);

// Question Vote and Un-vote
router.patch('/vote', QuestionController.vote);
router.patch('/unvote', QuestionController.unvote);

module.exports = router;
