import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import SellMyList from './SellMyList.jsx';
const SellMySet = () => {
  return (
    <>
      <SellHeader />
      <SellMyList></SellMyList>
      <SellFooter />
    </>
  );
};

export default SellMySet;
