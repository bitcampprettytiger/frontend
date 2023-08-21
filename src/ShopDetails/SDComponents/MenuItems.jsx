import React, { useEffect, useState, useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';

function MenuItem({ menu, isLast, viewType, fontSize }) {
  const [menuData, setMenuData] = useState(null);

  // useEffect(() => {
  //   if (viewType === 'MenuOrderPage' || viewType === 'MenuSeeMore') {
  //     // axios.get(`http://27.96.135.75/menu/info/${menu.id}`)
  //       .then(response => {
  //     setMenuData(response.data); // 받아온 데이터를 menuData에 저장
  //   })
  //       .catch(error => {
  //         console.error('메뉴 데이터가 없습니다.', error);
  //       });
  //   }
  // }, [menu.vendor.id, viewType]);

  const renderContent = () => {
    if (viewType === 'MenuOrderPage' && menuData) {
      return (
        <>
          <div className="menu-image">
            <img src={menuData.image} alt={menuData.name} />
          </div>
          <div className="menu-info">
            <h3>{menuData.name}</h3>
            <p className="menu-description">{menuData.description}</p>
            <p className="menu-price">가격: {menuData.price}원</p>
          </div>
        </>
      );
    } else if (viewType === 'MenuSeeMore') {
      return (
        <>
          <ListItemText primary={menu.name}
            primaryTypographyProps={{ sx: { fontSize, fontWeight: 'bold' } }} />
          <ListItemText
            primary={menu.price}
            primaryTypographyProps={{
              sx: {
                fontSize,
                textAlign: 'right',
              },
            }}
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <ListItem>
        {renderContent()}
      </ListItem>
      {!isLast && <Divider />}
    </React.Fragment>
  );
}

export default MenuItem;