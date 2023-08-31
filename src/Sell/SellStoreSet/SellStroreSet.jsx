import React, { useState } from 'react';
import SSSMenuList from './SSSComponents/SSSMenuList.jsx';
import SSSMenuInputs from './SSSComponents/SSSMenuInputs.jsx';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import { Menu } from '@mui/material';
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

  return (
    <div
      style={{
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        height: '100%'
      }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <SellHeader></SellHeader>
      <SSSMenuInputs onAddMenu={handleAddMenu}></SSSMenuInputs>
      <SSSMenuList menus={menus} onDeleteMenu={handleDeleteMenu}></SSSMenuList>
      {/* <SSSReserveBtn></SSSReserveBtn> */}
      <SellFooter></SellFooter>
    </div>
  );
};

export default SellStoreSet;
