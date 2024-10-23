// room.controller.js
const db = require('../config/db.config');
const mysql = require('mysql2');

const pool = mysql.createPool(db).promise();

exports.getAllRooms = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ROOM');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const { Room_No, Type, Status, Price_Per_Day, 
                Floor, Capacity } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO ROOM SET ?',
            { Room_No, Type, Status, Price_Per_Day, 
              Floor, Capacity }
        );
        
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ROOM WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE ROOM SET ? WHERE id = ?',
            [req.body, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM ROOM WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};