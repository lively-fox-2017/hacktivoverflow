const express = require('express');
const router = express.Router();
const question = require('../controller/question');

router.get('/',question.findAll);
// router.get('/:token',question.findByUserId);
router.get('/:id',question.findById);
router.post('/',question.create);
router.put('/:id',question.update);
router.delete('/:id',question.delete);
router.put('/like/:id',question.like);
router.put('/unlike/:id',question.unlike);
router.put('/dislike/:id',question.dislike);
router.put('/undislike/:id',question.undislike);

module.exports = router;
