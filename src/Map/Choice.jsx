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
        <button className="o">화성</button>
        <button className="t">고양</button>
        <button className="tr">평택</button>
        <button className="f">세종</button>
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
