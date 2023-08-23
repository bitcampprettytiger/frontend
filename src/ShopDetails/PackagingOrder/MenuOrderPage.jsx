import React, { useState } from 'react';
import menuList from '../../DataEx/menuList';
import Divider from '@mui/material/Divider';
import { StyledMenuItem, StyledMenuList } from './MenuOrderStyle';
import MenuOptionalPage from './MenuOptionalPage';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function groupByCategory(menuList) {
  const menuGroups = {};

  menuList.forEach((menu) => {
    const category = menu.category;
    if (!menuGroups[category]) {
      menuGroups[category] = [];
    }
    menuGroups[category].push(menu);
  });

  return menuGroups;
}

const menuGroups = groupByCategory(menuList);

function MenuOrderPage() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedMenus, setAddedMenus] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleMenuAdd = (menu) => {
    setAddedMenus([...addedMenus, menu]);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsModalVisible(true);
  };

  return (
    <>
      <StyledMenuList>
        {Object.keys(menuGroups).map((category) => (
          <React.Fragment key={category}>
            <h4 className="category-header">{category}</h4>
            {menuGroups[category].map((menu) => (
              <React.Fragment key={menu.id}>
                <StyledMenuItem onClick={() => handleMenuClick(menu)}>
                  <div className="menu-image">
                    <img src={menu.image} alt={menu.name} />
                  </div>
                  <div className="menu-info">
                    <h3>{menu.name}</h3>
                    <p className="menu-description">{menu.description}</p>
                    <p className="menu-price">가격: {menu.price}원</p>
                  </div>
                </StyledMenuItem>
                <Divider sx={{ my: 0, height: '0.2px', bgcolor: 'gray.300' }} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </StyledMenuList>
      {isModalVisible && (
        <MenuOptionalPage
          selectedMenu={selectedMenu} 
          onClose={handleClose}
          onMenuAdd={handleMenuAdd}
        />
      )}
      {addedMenus.length > 0 && (

        <Button
        sx={{
          backgroundColor: '#FF745A',
          width: '70vw',
          height: '48px',
          color: 'white',
          fontSize: '17px',
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onClick={() =>
          navigate('/cart', {
            state: { addedMenus },
          })
        }
      >
        담은 메뉴
      </Button>
    )}
    </>
  );
}

export default MenuOrderPage;