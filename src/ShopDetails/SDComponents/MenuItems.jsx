import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';

function MenuItem({ menu, isLast, viewType, fontSize }) {
  const [menuDataList, setMenuDataList] = useState([]);
  const [data, setData] = useState();
  // useEffect(() => {
  //   if (viewType === 'MenuOrderPage' || viewType === 'MenuSeeMore') {
  //     axios.get(`http://27.96.135.75/menu/info/${menu.id}`)
  //       .then(response => {
  //         const menuDTOList = response.data.itemlist;
  //         setMenuDataList(menuDTOList);
  //       })
  //       .catch(error => {
  //         console.error('메뉴 데이터가 없습니다.', error);
  //       });
  //     console.log(response)
  //   }
  // }, [menu.vendor.id, viewType]);
  const test = async () => {

    try {
      const response = axios.get('http://27.96.135.75/menu/info')
      setData(response)
      console.log(response)
    } catch (e){
      console.log(e);
    }
}

  const renderContent = () => {
    if (viewType === 'MenuOrderPage' && menuDataList) {
      return (
        <>
          <div className="menu-image">
            <img src={menuDataList.menuImageList[0]?.url} alt={menuDataList.menuName} />
          </div>
          <div className="menu-info">
            <h3>{menuDataList.menuName}</h3>
            <p className="menu-description">{menuDataList.menuContent}</p>
            <p className="menu-price">가격: {menuDataList.price}원</p>
          </div>
        </>
      );
    } else if (viewType === 'MenuSeeMore') {
      return (
        <>
          <ListItemText primary={menuDataList.menuName}
            primaryTypographyProps={{ sx: { fontSize, fontWeight: 'bold' } }} />
          <ListItemText
            primary={menuDataList.price}
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