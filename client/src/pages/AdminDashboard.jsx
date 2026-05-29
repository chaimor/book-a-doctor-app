import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/doctors',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctors/${doctorId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Doctor approved successfully!');
      fetchDoctors();
    } catch (error) {
      setMessage('Error approving doctor');
    }
  };

  const rejectDoctor = async (doctorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/doctors/${doctorId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Doctor rejected!');
      fetchDoctors();
    } catch (error) {
      setMessage('Error rejecting doctor');
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No doctor applications</td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.userId.name}</td>
                <td>{doctor.userId.email}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience} years</td>
                <td>${doctor.fees}</td>
                <td>
                  <Badge bg={doctor.status === 'approved' ? 'success' : doctor.status === 'rejected' ? 'danger' : 'warning'}>
                    {doctor.status}
                  </Badge>
                </td>
                <td>
                  {doctor.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => approveDoctor(doctor._id)}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => rejectDoctor(doctor._id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
