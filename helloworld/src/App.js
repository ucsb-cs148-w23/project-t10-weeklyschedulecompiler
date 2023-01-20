import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Team 10 Project</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ height: '80vh' }}>
        <Row
          style={{ height: '100%' }}
          className="justify-content-center align-items-center"
        >
          <Col className="d-flex justify-content-center">
            <h1>Hello world</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
