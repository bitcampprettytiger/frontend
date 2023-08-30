import React, { useState,useEffect } from 'react';
import SSUHeader from './SSUComponents/SSUHeader';
import SellSignUp1 from './SSUComponents/SellSignUp1';
import SellSignUp2 from './SSUComponents/SellSignUp2';
import SellSignUp3 from './SSUComponents/SellSignUp3';
const SellSignUp = () => {

  return (
    <>
      <SSUHeader></SSUHeader>
      <SellSignUp1></SellSignUp1>
      <SellSignUp2  />
      <SellSignUp3  />
    </>
  );
};

export default SellSignUp;
