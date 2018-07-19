const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerAnswer')

router.get('/:questionId', controller.findAll);

// router.get('/:userid', controller.findMyAnswer);

router.post('/insert/:questionId', controller.insert);

router.put('/vote/:id', controller.vote);

router.put('/update/:id', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router
