// room.routes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

router.get('/', roomController.getAllRooms);
router.post('/', roomController.createRoom);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;