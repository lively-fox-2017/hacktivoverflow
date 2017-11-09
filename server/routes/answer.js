const express = require('express');
const router = express.Router();
const answer = require('../controller/answer');

router.get('/',answer.findAll);
router.get('/:token',answer.findByUserId);
router.get('/byquestion/:id',answer.findByQuestionId);
router.post('/',answer.create);
router.put('/:id',answer.update);
router.delete('/:id',answer.delete);
router.put('/like/:id',answer.like);
router.put('/unlike/:id',answer.unlike);
router.put('/dislike/:id',answer.dislike);
router.put('/undislike/:id',answer.undislike);

module.exports = router;
