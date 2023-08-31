import React from 'react';
import './Choice.css';

const Choice = ({ moveToCurrentPosition, toggleSIGmenu, selectedSIGmenus  }) => {
  return (
    <div className="full">
      <div className="menu-wrap">
        <div className="cate" onClick={moveToCurrentPosition}>
          <img src="images/stfood.png"></img>
        </div>
        <input className="input"></input>
      </div>
      <div className="flex-wrap">
        {['분식', '국물', '볶음', '튀김'].map((type, index) => (
          <button
            key={index}
            className={selectedSIGmenus .includes(type) ? 'selected' : ''}
            onClick={() => toggleSIGmenu(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Choice;
