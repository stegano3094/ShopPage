import React, {useState} from 'react';
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

        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다!</p>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <img src={find.image_url} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5"> {find.title} </h4>
            <p> {find.content} </p>
            <p> {find.price}원 </p>
            <button className="btn btn-danger">주문하기</button>
            <button className="btn btn-danger" onClick={ ()=> {
                // history.goBack();
                history.push("/");
            } }>뒤로가기</button>
          </div>
        </div>
      </div>
    )
}

export default Detail;