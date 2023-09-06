import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  // 메뉴 추가
  const addMenuItem = async (selectedMenuId) => {
    const fixedQuantity = 1;
    try {
      const payload = {
        menu: selectedMenuId,
        cartQuantity: fixedQuantity,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        'http://localhost/cart/info',
        payload,
        config
      );
      console.log('메뉴추가', response);

      // 나머지 코드는 동일
    } catch (error) {
      console.error('메뉴 추가 오류', error);
    }
  };

  // 전체 삭제
  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost/cart/info`, { headers });
      setCartItems([]);
      console.log('ssssssssss');
    } catch (error) {
      console.error('장바구니 전체 삭제 오류', error);
    }
  };

  // 선택 삭제
  const deleteCartItem = async (cartId, menuId) => {
    console.log(cartId);
    console.log('메뉴 아이디' + menuId);
    try {
      const response = await axios.delete(
        `http://localhost/cart/deletecartitem`,
        {
          headers: headers,
          params: {
            cartId: cartId,
            menuId: menuId,
          },
        }
      );
      const updatedItems = cartItems.filter((item) => item.menu.id !== menuId);
      setCartItems(updatedItems);
      console.log(cartItems);
    } catch (error) {
      console.error('장바구니 메뉴 삭제 오류', error);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
  };

  // 사용자 장바구니 확인
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost/cart/info', {
        headers,
      });
      if (response.status === 200) {
        setCartItems(response.data.itemlist);
        console.log('장바구니확인', response);
      }
    } catch (error) {
      console.error('장바구니 메뉴 가져오기 오류', error);
    }
  };

  useEffect(() => {
    console.log('패치카트 아이템 시작');
    fetchCartItems();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return {
    cartItems,
    setCartItems,
    addMenuItem,
    clearCart,
    deleteCartItem,
    fetchCartItems,
  };
}
