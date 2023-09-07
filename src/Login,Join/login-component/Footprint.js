import React from 'react';
import { MdOutlinePets } from 'react-icons/md';
import './Footprint.css';

const Footprint = ({ x, y, rotation, flip, opacity  }) => (
  <div
    className="footprint"
    style={{
      left: x,
      top: y,
      transform: `rotate(${rotation}deg) scaleX(${flip ? -1 : 1})`
    }}
  >
    <MdOutlinePets size="30" style={{color: '#BDBDBD', opacity: opacity}} />
  </div>
);


export default Footprint;
