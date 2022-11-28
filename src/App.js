//import './App.css';
import {ApiTest} from "./ApiTest"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <div className="App">
      <NavbarDarkExample />
      <ApiTest />
    </div>
  );
}

export function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">NOBELFINDER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="FILTER"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">YEAR</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">CATEGORY</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">MOST POPULAR</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                TEAM 1 PRODUCTION
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
