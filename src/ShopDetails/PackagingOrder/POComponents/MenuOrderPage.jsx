import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { StyledMenuItem, StyledMenuList } from './MenuOrderStyle';
import MenuOptionalPage from './MenuOptionalPage';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useMenuData from '../../SDCustomHooks/useMenuData';

function groupByMenuType(menuDataList) {
  const menuGroups = {};

  menuDataList.forEach((menuDataItem) => {
    const menuType = menuDataItem.menuType;
    if (!menuGroups[menuType]) {
      menuGroups[menuType] = [];
    }
    menuGroups[menuType].push(menuDataItem);
  });

  return menuGroups;
}


function MenuOrderPage() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedMenus, setAddedMenus] = useState([]);
  const navigate = useNavigate();
  const menuDataList = useMenuData();
  const menuGroups = groupByMenuType(menuDataList);

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
        {Object.keys(menuGroups).map((menuType) => (
          <React.Fragment key={menuType}>
            <h4 className="category-header">{menuType}</h4>
            {menuGroups[menuType].map(menuDataItem => (
              <React.Fragment key={menuDataItem.id}>
                <StyledMenuItem onClick={() => handleMenuClick(menuDataItem)}>
                  <div className="menu-image">
                    <img src={menuDataItem.menuImageList[0]?.url} alt={menuDataItem.menuName} />
                  </div>
                  <div className="menu-info">
                    <h3>{menuDataItem.menuName}</h3>
                    <p className="menu-description">{menuDataItem.menuContent}</p>
                    <p className="menu-price">가격: {menuDataItem.price}원</p>
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