import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function useMenuData() {
  const [menuDataList, setMenuDataList] = useState([]);
  const { vendorId } = useParams();

  useEffect(() => {
    axios.get(`http://27.96.135.75/menu/info/${vendorId}`)
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
