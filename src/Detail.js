import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss'
import { 재고context } from './App.js'
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux';

let 박스 = styled.div`
    padding: 20px;
`;

let 제목 = styled.h4`
    font-size: 25px;
    color: ${props => props.색상};
`;

function Detail(props) {
  useEffect(
    () => {
      var arr = localStorage.getItem('watched');
      
      if (arr == null) {
        arr = []
      } else {
        arr = JSON.parse(arr)
      }
  
      arr.push(id)
      arr = new Set( arr )  // Set 자료형으로 변환하며 중복이 제거됨
      arr = [...arr]
  
      localStorage.setItem( 'watched', JSON.stringify(arr) )
    }, []
  );
  
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let 재고 = useContext(재고context);
  console.log('fiodsjfa' + 재고)

  let [alertVisible, alertVisibleChange] = useState(true)

  // useEffect훅 (컴포넌트가 mount되었을 때, update가 될 때 실행)
  useEffect(() => {
    // 2초 후에 alert 창을 안보이게 함
    let 타이머 = setTimeout(() => {
      alertVisibleChange(false)
    }, 2000)
    console.log("실행됨")

    return () => { clearTimeout(타이머) }
  }, [alertVisible]);

  let [inputData, inputData변경] = useState('')
  let history = useHistory();
  let { id } = useParams();

  let find = props.shoes.find(function (상품) {
    return 상품.id == id
  })

  return (
    <div className="container">
      <박스>
        <제목 className="red" >Detail</제목>
        {/* <제목 색상="red" >props 전송할 때 방법 1</제목>
            <제목 색상={'blue'} >props 전송할 때 방법 2</제목> */}
      </박스>

      {inputData}
      <input onChange={(e) => { inputData변경(e.target.value) }} />

      {
        alertVisible ?
          <div className="my-alert2">
            <p>재고가 얼마 남지 않았습니다!</p>
          </div>
          :
          null
      }

      <div className="row">
        <div className="col-md-6">
          <img src={find.image_url} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5"> {find.title} </h4>
          <p> {find.content} </p>
          <p> {find.price}원 </p>

          <Info 재고={props.재고} />

          <button className="btn btn-danger" onClick={ () => {
            props.재고변경([9, 10, 11]) 
            props.dispatch( { type:'항목추가', payload: { id: 3, name: '슈즈33', quan: 10 } } )
            history.push('/cart')

          }} >주문하기</button>
          <button className="btn btn-danger" onClick={() => {
            // history.goBack();
            history.push("/");
          }}>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => { 스위치변경(false); 누른탭변경(0) }} >Active 0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { 스위치변경(false); 누른탭변경(1) }} >Active 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => { 스위치변경(false); 누른탭변경(2) }} >Active 2</Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>

    </div>
  )
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  })

  if (props.누른탭 === 0) {
    return <div>0</div>
  } else if (props.누른탭 === 1) {
    return <div>1</div>
  } else if (props.누른탭 === 2) {
    return <div>2</div>
  } else {
    return null;
  }
}

function Info(props) {
  return (
    <p>재고 : {props.재고[2]} </p>
  )
}

function state를props화(state) {
  return {
      state: state
  }
}

export default connect(state를props화)(Detail);