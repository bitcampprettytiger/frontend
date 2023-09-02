import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function useMenuData() {
  const [menuDataList, setMenuDataList] = useState([]);
  const { vendorId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type' : 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

//메뉴 데이터 조회
  useEffect(() => {
    axios.get(`http://192.168.0.240/menu/info/${vendorId}`, { headers })
      .then(response => {
        const menuDTOList = response.data.itemlist;
        setMenuDataList(menuDTOList);
      })
      .catch(error => {
        console.error('메뉴 데이터가 없습니다.', error);
      });
  }, [vendorId]);

  return menuDataList;
}

export default useMenuData;
