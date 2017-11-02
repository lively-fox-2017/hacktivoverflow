var express = require('express');
var cors = require('cors')
var postCtrl = require('../controllers/post')
var router = express.Router();

router.use(cors())

/* GET home page. */
router.get('/', postCtrl.get);

router.post('/', postCtrl.post)

module.exports = router;