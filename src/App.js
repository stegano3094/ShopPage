import './App.css';
import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import Data from './data.js';

import { Link, Route, Switch } from 'react-router-dom'
import Detail from './Detail.js'
import axios from 'axios'

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 5, 16]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
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
          
          <button className="btn btn-primary" onClick={ () => {
            // 로딩 중이라는 UI 띄움

            axios.get("https://codingapple1.github.io/shop/data2.json")  // 서버한테 get 요청하는 코드
            .then( (result)=>{
              // 로딩 중이라는 UI 지움

              var tempShoes = [...shoes, ...result.data]
              shoes변경(tempShoes)

            } )  // 성공 시 실행
            .catch( ()=>{ 
              // 로딩 중이라는 UI 지움

              console.log('get실패')
            } )  // 실패 시 실행
          }} >더보기</button>

        </Route>yarn add axios

        {/* 상세 페이지 */}
        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
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