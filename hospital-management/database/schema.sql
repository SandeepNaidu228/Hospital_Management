<antArtifact identifier="hospital-schema" type="application/vnd.ant.code" language="sql" title="schema.sql">
-- Create database
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;
-- Create tables (your existing table creation SQL)
CREATE TABLE IF NOT EXISTS PATIENT (
P_ID INT PRIMARY KEY,
Name VARCHAR(50) NOT NULL,
DOB DATE NOT NULL,
Mob_No VARCHAR(15) NOT NULL,
Age INT NOT NULL,
Gender VARCHAR(10) NOT NULL,
Admission_Date DATE NOT NULL,
Caregiver_Phone VARCHAR(15) NOT NULL,
Caregiver_Name VARCHAR(50) NOT NULL,
Cause VARCHAR(255) DEFAULT 'unknown',
Appointment DATETIME NOT NULL,
patient_condition varchar(50)
);
-- (Rest of your table creation statements)
-- Insert initial data (your existing insert statements)
INSERT INTO patient VALUES
(0001,"Raju",'2000-06-11',"9390950426",24,"Male",'2024-08-01',"9845219625","John","accident",'2024-08-01 12:30:45'),
(0002,"Mohith",'2002-04-21',"9584950927",22,"Male",'2024-09-11',"9845225677","Bharath","infection",'2024-09-11 16:20:20'),
(0003,"Jayanth",'2001-04-21',"9584925927",23,"Male",'2024-07-18',"9845222549","Sravan","fracture",'2024-07-18 13:40:25');
-- (Rest of your insert statements)