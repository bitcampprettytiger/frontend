import React from 'react';
import './Choice.css';

const Choice = ({ moveToCurrentPosition, toggleVendorType, selectedVendorTypes }) => {
  return (
    <div className="full">
      <div className="menu-wrap">
        <div className="cate" onClick={moveToCurrentPosition}>
          <img src="images/stfood.png"></img>
        </div>
        <input className="input"></input>
      </div>
      <div className="flex-wrap">
        {['양식', '일식', '분식', '중식'].map((type, index) => (
          <button
            key={index}
            className={selectedVendorTypes.includes(type) ? 'selected' : ''}
            onClick={() => toggleVendorType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Choice;
