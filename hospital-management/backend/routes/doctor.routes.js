const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;