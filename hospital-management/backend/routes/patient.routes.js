const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.get('/', patientController.getAllPatients);
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatientById);
// Add other routes as needed

module.exports = router;