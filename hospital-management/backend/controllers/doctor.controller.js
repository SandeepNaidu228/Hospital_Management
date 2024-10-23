// doctor.controller.js
const db = require('../config/db.config');
const mysql = require('mysql2');

const pool = mysql.createPool(db).promise();

exports.getAllDoctors = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DOCTOR');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { Name, Specialization, Contact_No, Email, 
                Availability, Experience, Qualification } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO DOCTOR SET ?',
            { Name, Specialization, Contact_No, Email, 
              Availability, Experience, Qualification }
        );
        
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DOCTOR WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE DOCTOR SET ? WHERE id = ?',
            [req.body, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM DOCTOR WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};