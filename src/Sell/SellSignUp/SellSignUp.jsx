import React, { useRef } from 'react';
import SSUHeader from './SSUComponents/SSUHeader';
import SellSignUp1 from './SSUComponents/SellSignUp1';
import SellSignUp2 from './SSUComponents/SellSignUp2';
import SellSignUp3 from './SSUComponents/SellSignUp3';
import {Scrollbar} from 'smooth-scrollbar-react';

const SellSignUp = () => {


  return (
    <>
      <SSUHeader></SSUHeader>
      <Scrollbar demping={0.04}>
        <div>
          <SellSignUp1></SellSignUp1>
          <SellSignUp2 />
          <SellSignUp3 />
        </div>
      </Scrollbar>
    </>
  );
};

export default SellSignUp;
