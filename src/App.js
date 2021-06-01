import './App.css';
import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import { name, name2 } from './testExport.js';
import Data from './data.js';

function App() {
  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="background">
        <h1>Welcome~</h1>
        <p>
          This is a simple hero unit.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>

      <div className="container">
        <div className="row">
          {
            shoes.map( (a, i)=> {
              return <Card shoes={shoes[i]} key={i} />
            })
          }
        </div>
      </div>

    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
        <img src={props.shoes.image_url} width="100%"/>
        <h4> {props.shoes.title} </h4>
        <p>{props.shoes.content} 가격: {props.shoes.price}</p>
    </div>
  )
}

export default App;