import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/appointments/doctor/some-doctor-id',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Appointment ${status}!`);
      fetchAppointments();
    } catch (error) {
      setMessage('Error updating appointment');
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Doctor Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No appointments found</td>
            </tr>
          ) : (
            appointments.map((apt) => (
              <tr key={apt._id}>
                <td>{apt.userId.name}</td>
                <td>{new Date(apt.date).toLocaleDateString()}</td>
                <td>{apt.timeSlot}</td>
                <td>{apt.reason}</td>
                <td>
                  <Badge bg={apt.status === 'confirmed' ? 'success' : 'warning'}>
                    {apt.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => updateStatus(apt._id, 'confirmed')}
                    className="me-2"
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => updateStatus(apt._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DoctorDashboard;
