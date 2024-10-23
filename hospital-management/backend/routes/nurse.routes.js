// nurse.routes.js
const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse.controller');

router.get('/', nurseController.getAllNurses);
router.post('/', nurseController.createNurse);
router.get('/:id', nurseController.getNurseById);
router.put('/:id', nurseController.updateNurse);
router.delete('/:id', nurseController.deleteNurse);

module.exports = router;