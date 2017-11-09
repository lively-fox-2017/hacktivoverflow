const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const questionRoutes = require('./questions');
const answerRoutes = require('./answers');

router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'HacktivOverflow API Index'
  });
});

module.exports = router;
