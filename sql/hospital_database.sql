-- ============================================================================
-- Hospital Patient Portal - Database Schema & Sample Data Script
-- Developer: Madduri Vara Prasad (Java Full Stack Developer)
-- Database Engine: MySQL 8.0+
-- Description: Relational Database Schema for Patient Management, Doctor 
--              Scheduling, Appointments, and Electronic Medical Records (EMR).
-- ============================================================================

-- Create Database Instance
CREATE DATABASE IF NOT EXISTS hospital_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE hospital_db;

-- ----------------------------------------------------------------------------
-- 1. Table: departments
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. Table: doctors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    department_id INT,
    consultation_fee DECIMAL(10, 2) DEFAULT 500.00,
    availability_status ENUM('AVAILABLE', 'ON_LEAVE', 'BUSY') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. Table: patients
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    blood_group VARCHAR(10),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. Table: appointments
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
    symptoms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. Table: medical_records
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS medical_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNIQUE,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis TEXT NOT NULL,
    prescription TEXT,
    doctor_notes TEXT,
    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- INDEXES FOR QUERY OPTIMIZATION
-- ----------------------------------------------------------------------------
CREATE INDEX idx_patient_email ON patients(email);
CREATE INDEX idx_doctor_specialization ON doctors(specialization);
CREATE INDEX idx_appointment_date ON appointments(appointment_date, status);

-- ----------------------------------------------------------------------------
-- SAMPLE SEED DATA FOR TESTING
-- ----------------------------------------------------------------------------

-- Insert Departments
INSERT INTO departments (department_name, description) VALUES
('Cardiology', 'Heart and cardiovascular care'),
('Neurology', 'Brain and nervous system treatment'),
('Pediatrics', 'Child healthcare services'),
('General Medicine', 'Primary healthcare and diagnosis')
ON DUPLICATE KEY UPDATE department_id=department_id;

-- Insert Doctors
INSERT INTO doctors (first_name, last_name, email, phone, specialization, department_id, consultation_fee) VALUES
('Dr. Ramesh', 'Kumar', 'ramesh.kumar@hospital.com', '+91 9876543210', 'Cardiologist', 1, 800.00),
('Dr. Sunita', 'Sharma', 'sunita.sharma@hospital.com', '+91 9876543211', 'Neurologist', 2, 1000.00),
('Dr. Anil', 'Verma', 'anil.verma@hospital.com', '+91 9876543212', 'Pediatrician', 3, 600.00)
ON DUPLICATE KEY UPDATE doctor_id=doctor_id;

-- Insert Patients
INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, blood_group, address) VALUES
('Madduri', 'Vara Prasad', 'varaprasad@example.com', '$2a$10$e7xW8...', '+91 9177948832', '2004-05-15', 'MALE', 'O+', 'Bengaluru, India'),
('John', 'Doe', 'john.doe@example.com', '$2a$10$y9aQ...', '+91 9876543213', '1998-08-20', 'MALE', 'A+', 'Hyderabad, India')
ON DUPLICATE KEY UPDATE patient_id=patient_id;

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, symptoms) VALUES
(1, 1, CURDATE() + INTERVAL 2 DAY, '10:30:00', 'CONFIRMED', 'Routine heart checkup and blood pressure assessment'),
(2, 2, CURDATE() + INTERVAL 3 DAY, '14:00:00', 'PENDING', 'Migraine and frequent headaches');

-- ----------------------------------------------------------------------------
-- VERIFICATION QUERY
-- ----------------------------------------------------------------------------
SELECT 
    a.appointment_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
    d.specialization,
    a.appointment_date,
    a.appointment_time,
    a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id;
