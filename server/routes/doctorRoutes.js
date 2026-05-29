const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all approved doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: 'approved' }).populate('userId', 'name email phone');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply as doctor
router.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { specialization, experience, fees, timings, bio, clinicAddress } = req.body;

    // Check if already applied
    const existingDoctor = await Doctor.findOne({ userId: req.user.id });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Already applied as doctor' });
    }

    const doctor = new Doctor({
      userId: req.user.id,
      specialization,
      experience,
      fees,
      timings,
      bio,
      clinicAddress,
    });

    await doctor.save();
    res.status(201).json({ message: 'Application submitted successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
