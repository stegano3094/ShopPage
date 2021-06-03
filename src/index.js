import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux';

let 초기값 = [
  { id: 0, name: '신발', quan: 2 },
  { id: 1, name: '슈즈', quan: 10 },
  { id: 2, name: '슈즈', quan: 10 }
]

function reducer(state = 초기값, 액션) {
  if(액션.type === '항목추가') {
    let copy = [...state]

    let found = state.findIndex( (a) => {
      return a.id === 액션.payload.id
    })

    if(found >= 0) {
      copy[found].quan++;
      return copy;
    } else {
      copy.push(액션.payload)
      return copy
    }
  }


  else if(액션.type === '증가') {
    console.log(액션.payload)

    let 수정된state = [...state]
    수정된state[액션.데이터].quan++;
    return 수정된state
  
  } else if (액션.type === '감소') {
    let 수정된state = [...state]
    수정된state[액션.데이터].quan--;
    
    if(수정된state[액션.데이터].quan < 1) 수정된state[액션.데이터].quan = 1

    return 수정된state
  
  } else {
    return state
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();