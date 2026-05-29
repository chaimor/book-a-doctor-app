import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/appointments/book',
        { doctorId, ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/doctors'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <Container className="form-container">
      <h2 className="mb-4">Book Appointment</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time Slot</Form.Label>
          <Form.Control
            type="time"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reason for Visit</Form.Label>
          <Form.Control
            as="textarea"
            name="reason"
            rows={3}
            placeholder="Describe your reason for the appointment"
            value={formData.reason}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Book Appointment
        </Button>
      </Form>
    </Container>
  );
};

export default BookAppointment;
