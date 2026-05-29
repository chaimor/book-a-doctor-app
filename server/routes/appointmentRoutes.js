const express = require('express');
const Appointment = require('../models/Appointment');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Book appointment
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;

    const appointment = new Appointment({
      userId: req.user.id,
      doctorId,
      date,
      timeSlot,
      reason,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate('doctorId')
      .populate('userId', 'name email');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor appointments
router.get('/doctor/:doctorId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('userId', 'name email phone')
      .populate('doctorId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
