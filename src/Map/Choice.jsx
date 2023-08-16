import React from 'react';
import './Choice.css';
const Choice = ({moveToCurrentPosition}) => {
  return (
    <div className='full'>
      <div className="menu-wrap">
        <div className="cate" onClick={moveToCurrentPosition}>
          <img src='images/stfood.png' ></img>
        </div>
        <input className="input"></input>
      </div>
      <div className="flex-wrap">
        <button className="o">양식</button>
        <button className="t">일식</button>
        <button className="tr">분식</button>
        <button className="f">중식</button>
      </div>
    </div>
  );
};

export default Choice;
