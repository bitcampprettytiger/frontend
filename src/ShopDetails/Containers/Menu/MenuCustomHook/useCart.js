import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const { memberId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type' : 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

  // 메뉴 추가
  const addMenuItem = async (menu) => {
    try {
      const response = await axios.post(
        'http://27.96.135.75/cart/info',
        {
          menu,
          member: { id: memberId },
        },
        { headers }
      );
      if (response.status === 200) {
        setCartItems([...cartItems, response.data]);
      }
    } catch (error) {
      console.log(error.response.data);
      console.error('메뉴 추가 오류', error);
    }
  };

  // 전체 삭제
  const clearCart = async () => {
    try {
      await axios.delete(`http://27.96.135.75/cart/info`, { headers });
      setCartItems([]);
    } catch (error) {
      console.error('장바구니 전체 삭제 오류', error);
    }
  };

  // 선택 삭제
  const deleteCartItem = async (menuId) => {
    try {
      await axios.post('http://localhost/cart/deletecartitem', { id: menuId });
      const updatedItems = cartItems.filter((item) => item.menu.id !== menuId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('장바구니 메뉴 삭제 오류', error);
    }
  };

  // 사용자 장바구니 확인
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost/cart/member/${memberId}`);
      if (response.status === 200) {
        setCartItems(response.data.itemlist || []); 
      }
    } catch (error) {
      console.error('장바구니 메뉴 가져오기 오류', error);
    }
  };

  return {
    cartItems,
    addMenuItem,
    clearCart,
    deleteCartItem,
    fetchCartItems,
  };
}
