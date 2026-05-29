import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4">
          <h1 className="display-4 fw-bold">Welcome to Book a Doctor</h1>
          <p className="lead">Your trusted healthcare booking platform. Find and book appointments with experienced doctors in your area.</p>
          {!token ? (
            <div>
              <Button variant="primary" size="lg" className="me-2" onClick={() => navigate('/register')}>Get Started</Button>
              <Button variant="outline-primary" size="lg" onClick={() => navigate('/login')}>Sign In</Button>
            </div>
          ) : (
            <Button variant="primary" size="lg" onClick={() => navigate('/doctors')}>Browse Doctors</Button>
          )}
        </Col>
        <Col md={6}>
          <div className="text-center">
            <h2 className="mb-4">📊 Key Features</h2>
            <div className="mb-3">
              <h5>✅ Easy Booking</h5>
              <p>Book appointments with just a few clicks</p>
            </div>
            <div className="mb-3">
              <h5>✅ Verified Doctors</h5>
              <p>Access to verified and experienced healthcare professionals</p>
            </div>
            <div>
              <h5>✅ Secure System</h5>
              <p>Your data is secure and encrypted</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
