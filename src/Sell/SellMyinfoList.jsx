import React, { useState, useEffect } from 'react';

import SellHeader from './SellLayout/SellHeader.jsx';
import SellFooter from './SellLayout/SellFooter.jsx';
import SellMyList from './SellMySet/SellMyList.jsx';
import SellVendorInfo from './SellMyinfo/SellVendorInfo';
const SellMyinfo = () => {
  return (
    <>
      <SellHeader />
      <SellVendorInfo />
      <SellFooter />
    </>
  );
};

export default SellMyinfo;
