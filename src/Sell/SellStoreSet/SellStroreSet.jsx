import React, { useState } from 'react';
import SSSMenuList from './SSSComponents/SSSMenuList.jsx';
import SSSUseLists from './SSSComponents/SSSUseLists.jsx';
import SSSReserveBtn from './SSSComponents/SSSReserveBtn.jsx';
import SSSMenuInputs from './SSSComponents/SSSMenuInputs.jsx';
import SellHeader from '../SellLayout/SellHeader.jsx'
import SellFooter from '../SellLayout/SellFooter.jsx'
const SellStoreSet = () => {
  const [menus, setMenus] = useState([]);

  const handleAddMenu = (menu, price) => {
    setMenus([...menus, { name: menu, price: price }]);
  };

  const handleDeleteMenu = (index) => {
    const newMenus = [...menus];
    newMenus.splice(index, 1);
    setMenus(newMenus);
  };

  return (
    <div style={{  overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`::-webkit-scrollbar { display: none; }`}
      </style>
      <SellHeader></SellHeader>
      <SSSMenuInputs onAddMenu={handleAddMenu}></SSSMenuInputs>
      <SSSMenuList menus={menus} onDeleteMenu={handleDeleteMenu}></SSSMenuList>
      <SSSUseLists></SSSUseLists>
      <SSSReserveBtn></SSSReserveBtn>
      <SellFooter></SellFooter>
    </div>
  );
};

export default SellStoreSet;

