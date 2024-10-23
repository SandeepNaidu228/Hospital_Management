const db = require('../config/db.config');
const mysql = require('mysql2');

const pool = mysql.createPool(db).promise();

exports.getAllPatients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM PATIENT');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { Name, DOB, Mob_No, Age, Gender, Admission_Date, 
                Caregiver_Phone, Caregiver_Name, Cause, Appointment } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO PATIENT SET ?',
            { Name, DOB, Mob_No, Age, Gender, Admission_Date, 
              Caregiver_Phone, Caregiver_Name, Cause, Appointment }
        );
        
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add other controller functions as needed