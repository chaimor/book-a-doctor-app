import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Navbar.Brand href="/" className="fw-bold">📋 Book a Doctor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {!token ? (
            <>
              <Nav.Link href="/login" className="me-2">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/doctors" className="me-2">Doctors</Nav.Link>
              {user?.role === 'doctor' && <Nav.Link href="/doctor-dashboard" className="me-2">My Dashboard</Nav.Link>}
              {user?.role === 'admin' && <Nav.Link href="/admin-dashboard" className="me-2">Admin Panel</Nav.Link>}
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
