const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerQuestion')

router.get('/', controller.findAll);

router.get('/:userid', controller.findMyPost);

router.post('/insert', controller.insert);

router.put('/vote/:id', controller.vote);

router.put('/update/:id', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router
