var express = require('express');
var cors = require('cors')
var postCtrl = require('../controllers/post')
var router = express.Router();

router.use(cors())

/* GET home page. */
router.get('/', postCtrl.get);

router.get('/:id/detail', postCtrl.detail);

router.post('/', postCtrl.post)

router.delete('/:id', postCtrl.del)

router.get('/answer/:id', postCtrl.getAnswer)

router.post('/answer/:id', postCtrl.postAnswer)

router.delete('/answer/:id', postCtrl.delAnswer)

router.post('/answer/:id/:vote', postCtrl.voteAnswer)

module.exports = router;