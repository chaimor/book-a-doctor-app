import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available at the moment.</p>
      ) : (
        <Row>
          {doctors.map((doctor) => (
            <Col md={6} lg={4} key={doctor._id} className="mb-4">
              <Card className="doctor-card h-100">
                <Card.Body>
                  <Card.Title>{doctor.userId.name}</Card.Title>
                  <Card.Text>
                    <strong>Specialization:</strong> {doctor.specialization}
                  </Card.Text>
                  <Card.Text>
                    <strong>Experience:</strong> {doctor.experience} years
                  </Card.Text>
                  <Card.Text>
                    <strong>Fees:</strong> ${doctor.fees}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone:</strong> {doctor.userId.phone}
                  </Card.Text>
                  {doctor.bio && <Card.Text><strong>Bio:</strong> {doctor.bio}</Card.Text>}
                  <Button variant="primary" onClick={() => navigate(`/book/${doctor._id}`)}>Book Appointment</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DoctorList;
