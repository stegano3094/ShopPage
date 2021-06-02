import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss'

let 박스 = styled.div`
    padding: 20px;
`;

let 제목 = styled.h4`
    font-size: 25px;
    color: ${ props => props.색상 };
`;


function Detail(props) {
    let [alertVisible, alertVisibleChange] = useState(true)

    // useEffect훅 (컴포넌트가 mount되었을 때, update가 될 때 실행)
    useEffect( () => {
      // 2초 후에 alert 창을 안보이게 함
      let 타이머 = setTimeout( () => {
        alertVisibleChange(false)
      }, 2000)
      console.log("실행됨")

      return ()=>{ clearTimeout(타이머)}
    }, [alertVisible]);

    let [inputData, inputData변경] = useState('')
    let history = useHistory();
    let { id } = useParams();
    
    let find = props.shoes.find(function(상품) {
        return 상품.id == id
    })

    return(
      <div className="container">
        <박스>
            <제목 className="red" >Detail</제목>
            {/* <제목 색상="red" >props 전송할 때 방법 1</제목>
            <제목 색상={'blue'} >props 전송할 때 방법 2</제목> */}
        </박스>
        
        {inputData}
        <input onChange={ (e)=>{inputData변경(e.target.value)} } />

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

            <Info 재고={props.재고}/>

            <button className="btn btn-danger" onClick={ ()=>{ props.재고변경([9, 10, 11]) } } >주문하기</button>
            <button className="btn btn-danger" onClick={ ()=> {
                // history.goBack();
                history.push("/");
            } }>뒤로가기</button>
          </div>
        </div>
      </div>
    )
}

function Info(props) {
  return (
    <p>재고 : {props.재고[2]} </p>
  )
}

export default Detail;