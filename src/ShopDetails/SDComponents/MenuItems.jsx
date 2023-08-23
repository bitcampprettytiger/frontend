import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MenuItem({ menu, isLast, viewType, fontSize }) {
  const [menuDataList, setMenuDataList] = useState([]);
  const { vendorId } = useParams();

  useEffect(() => {  
    if (menu.vendor && (viewType === 'MenuOrderPage' || viewType === 'MenuSeeMore')) {
      axios.get(`http://27.96.135.75/vendor/infoDetail/${vendorId}`)
        .then(response => {
          const menuDTOList = response.data.itemlist;
          setMenuDataList(menuDTOList);
        })
        .catch(error => {
          console.error('메뉴 데이터가 없습니다.', error);
        });
    }
  }, [menu.vendor, vendorId, viewType]);

  const renderContent = (menuDataItem) => {
    if (viewType === 'MenuOrderPage' && menuDataItem) {
      return (
        <>
          <div className="menu-image">
            <img src={menuDataItem.menuImageList[0]?.url} alt={menuDataItem.menuName} />
          </div>
          <div className="menu-info">
            <h3>{menuDataItem.menuName}</h3>
            <p className="menu-description">{menuDataItem.menuContent}</p>
            <p className="menu-price">가격: {menuDataItem.price}원</p>
          </div>
        </>
      );
    } else if (viewType === 'MenuSeeMore') {
      return (
        <>
          <ListItemText primary={menuDataItem.menuName}
            primaryTypographyProps={{ sx: { fontSize, fontWeight: 'bold' } }} />
          <ListItemText
            primary={menuDataItem.price}
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
    <>
      {menuDataList.map(menuDataItem => (
        <ListItem key={menuDataItem.id}>
          {renderContent(menuDataItem)}
        </ListItem>
      ))}
      {!isLast && <Divider />}
    </>
  );
}

export default MenuItem;