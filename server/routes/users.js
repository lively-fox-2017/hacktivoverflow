var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')

router.post('/', UserController.addNew )
router.get('/', UserController.getAll )
router.get('/:id', UserController.getID )
router.put('/:id', UserController.editData )
router.delete('/:id', UserController.deleteData )

module.exports = router;
