import './App.css';
import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import { name, name2 } from './testExport.js';
import Data from './data.js';

import { Link, Route, Switch } from 'react-router-dom'
import Detail from './Detail.js'

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
              <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
              <Nav.Link> <Link to="/detail">Detail</Link> </Nav.Link>
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

      {/**Switch는 여러개의 컴포넌트(Route)가 맞아도 제일 위의 하나만 보여주도록 함 */}
      <Switch>
        {/* Swtich문에 break가 없는 것처럼 동작함, Switch 컴포넌트가 있을 땐 break가 있는 것처럼 동작함 */}
        {/* 메인 페이지 */}
        <Route exact path="/" >
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
        </Route>

        {/* 상세 페이지 */}
        <Route path="/detail/:id">
          <Detail shoes={shoes} />
        </Route>

        {/* /:id는 /뒤에 아무 문자열이나 들어가 있을 때 라는 의미이다 */}
        <Route path="/:id" >
          <div>무조건 보여주세요.</div>
        </Route>

      </Switch>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
        <img src={props.shoes.image_url} width="100%"/>
        <h4> {props.shoes.title} </h4>
        <p>{props.shoes.content} 가격: {props.shoes.price}원</p>
    </div>
  )
}

export default App;