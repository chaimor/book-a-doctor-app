const express = require('express');
const Doctor = require('../models/Doctor');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all doctor applications
router.get('/doctors', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email phone');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve doctor
router.put('/doctors/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json({ message: 'Doctor approved', doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject doctor
router.put('/doctors/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json({ message: 'Doctor rejected', doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
