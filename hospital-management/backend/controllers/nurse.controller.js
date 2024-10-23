// nurse.controller.js
const db = require('../config/db.config');
const mysql = require('mysql2');

const pool = mysql.createPool(db).promise();

exports.getAllNurses = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM NURSE');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNurse = async (req, res) => {
    try {
        const { Name, Shift, Contact_No, Department, 
                Experience, Qualification } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO NURSE SET ?',
            { Name, Shift, Contact_No, Department, 
              Experience, Qualification }
        );
        
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNurseById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM NURSE WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNurse = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE NURSE SET ? WHERE id = ?',
            [req.body, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNurse = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM NURSE WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
        res.json({ message: 'Nurse deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};