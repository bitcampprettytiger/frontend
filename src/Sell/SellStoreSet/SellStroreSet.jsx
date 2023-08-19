import React, { useState } from 'react';
import SSSMenuInput from './SSSComponents/SSSMenuInput.jsx';
import SSSMenuList from './SSSComponents/SSSMenuList.jsx';
import SSSUseLists from './SSSComponents/SSSUseLists.jsx';
import SSSReserveBtn from './SSSComponents/SSSReserveBtn.jsx';

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
    <div style={{ height: '100vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* 스크롤 바 숨기기를 위한 Chrome, Safari, Firefox, IE 스타일 */}
      <style>
        {`::-webkit-scrollbar { display: none; }`}
      </style>
      <SSSMenuInput onAddMenu={handleAddMenu}></SSSMenuInput>
      <SSSMenuList menus={menus} onDeleteMenu={handleDeleteMenu}></SSSMenuList>
      <SSSUseLists></SSSUseLists>
      <SSSReserveBtn></SSSReserveBtn>
    </div>
  );
};

export default SellStoreSet;
