import React from 'react';
import './Choice.css';
const Choice = ({moveToCurrentPosition}) => {
  return (
    <div className='full'>
      <div className="menu-wrap">
        <div className="cate">
          <img src='images/stfood.png'></img>
        </div>
        <input className="input"></input>
      </div>
      <div className="flex-wrap">
        <button className="o">양식</button>
        <button className="t">일식</button>
        <button className="tr">분식</button>
        <button className="f">중식</button>
      </div>
      {/*
        임시 보류
      <div className='myloca' onClick={moveToCurrentPosition}> 
        <img src="img/현위치.png"/>
      </div> */}
    </div>
  );
};

export default Choice;
