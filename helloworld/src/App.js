import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Home Page</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a>Profile</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div
          style={{ height: '100vh' }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            style={{ backgroundColor: 'Orange', height: '35%', width: '35%' }}
            className="d-flex justify-content-center align-items-center"
          >
            <h1> Hello World </h1>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
