import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { StyledMenuItem, StyledMenuList } from './MenuOrderStyle';
import MenuOptionalModal from './MenuOptionalModal';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useMenuData from '../MenuCustomHook/useMenuData';
import useCart from '../MenuCustomHook/useCart';
import useResponsive from '../../../SDCustomHooks/useResponsive';

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

function MenuOrderPage({ vendorId }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedMenus, setAddedMenus] = useState([]);
  const navigate = useNavigate();
  const menuDataList = useMenuData();
  const menuGroups = groupByMenuType(menuDataList);
  const { addMenuItem } = useCart();
  const { width } = useResponsive();

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleMenuAdd = (selectedMenuId) => {
    addMenuItem(selectedMenuId);
    console.log('셀렉메뉴아이디', selectedMenuId);
    setAddedMenus((prevMenus) => [...prevMenus, selectedMenuId]);
    setIsModalVisible(false);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    console.log('메뉴클릭', menu);
    setIsModalVisible(true);
  };

  const adjustWidth = (originalWidth) => {
    const numericValue = parseInt(originalWidth, 10);
    const adjustedValue = numericValue - 10;
    return `${adjustedValue}%`;
  };

  const adjustedWidth = adjustWidth(width);

  return (
    <>
      <StyledMenuList>
        {Object.keys(menuGroups).map((menuType) => (
          <React.Fragment key={menuType}>
            <h4 className="category-header">{menuType}</h4>
            {menuGroups[menuType].map((menuDataItem) => (
              <React.Fragment key={menuDataItem.id}>
                <StyledMenuItem onClick={() => handleMenuClick(menuDataItem)}>
                  <div className="menu-image">
                    <img
                      src={menuDataItem.menuImageList[0]?.url}
                      alt={menuDataItem.menuName}
                    />
                  </div>
                  <div className="menu-info">
                    <h3 style={{fontWeight: 'bold'}}>{menuDataItem.menuName}</h3>
                    <div className="menu-description">
                      {menuDataItem.menuContent}
                    </div>
                    <div className="menu-price" style={{fontWeight: 'bold'}}>
                      가격: {menuDataItem.price.toLocaleString()}원
                    </div>
                  </div>
                </StyledMenuItem>
                <Divider sx={{ my: 0, height: '0.2px', bgcolor: 'gray.300' }} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </StyledMenuList>

      {isModalVisible && (
        <MenuOptionalModal
          open={isModalVisible}
          onClose={handleClose}
          selectedMenu={selectedMenu}
          onMenuAdd={() => handleMenuAdd(selectedMenu.id)}
        />
      )}
      {addedMenus.length > 0 && (
        <Button
          sx={{
            backgroundColor: '#FD5E53',
            width: adjustedWidth,
            height: '7%',
            color: 'white',
            fontSize: '17px',
            position: 'fixed',
            bottom: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
            '&:hover': {
              backgroundColor: '#FD5E53',
            },
          }}
          onClick={() =>
            navigate(`/cart`, {
              state: { addedMenus: addedMenus, vendorId: vendorId },
            },console.log('카트로 이동하는 벤더아읻',vendorId)
            )
          }
        >
          장바구니
        </Button>
      )}
    </>
  );
}

export default MenuOrderPage;
