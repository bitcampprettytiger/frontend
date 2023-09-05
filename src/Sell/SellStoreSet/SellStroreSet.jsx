import React, { useState, useRef, useEffect } from 'react';
import SSSMenuList from './SSSComponents/SSSMenuList.jsx';
import SSSMenuInputs from './SSSComponents/SSSMenuInputs.jsx';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import { Menu } from '@mui/material';
import Scrollbar from 'smooth-scrollbar';

const SellStoreSet = () => {
  const [menus, setMenus] = useState([]);

  const handleAddMenu = (menuType, menuName, menuContent, price, menuImage) => {
    setMenus([...menus, { menuType, menuName, menuContent, price, menuImage }]);
  };
  const handleDeleteMenu = (index) => {
    const newMenus = [...menus];
    newMenus.splice(index, 1);
    setMenus(newMenus);
  };
  useEffect(() => {

    Scrollbar.init(document.getElementById("my-scrollbar"), {damping: 0.01,
      thumbMinSize: 20,
      renderByPixels: !('ontouchstart' in document),
      alwaysShowTracks: false,
      continuousScrolling: true,});
  }, []);
  return (
    <div
      style={{
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        height: '100vh',
      }}
      id="my-scrollbar"
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <SellHeader></SellHeader>
      <div style={{
        padding: '5%',
        height: '80vh' 
      }}
      >
        <SSSMenuInputs onAddMenu={handleAddMenu}></SSSMenuInputs>
        <SSSMenuList menus={menus} onDeleteMenu={handleDeleteMenu}></SSSMenuList>
      </div>
      {/* <SSSReserveBtn></SSSReserveBtn> */}
      <SellFooter></SellFooter>
    </div>
  );
};

export default SellStoreSet;
