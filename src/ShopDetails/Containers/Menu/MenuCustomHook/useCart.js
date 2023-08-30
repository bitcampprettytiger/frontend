import { useState,useEffect } from 'react';
import axios from 'axios';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };


  // 메뉴 추가
  const addMenuItem = async (selectedMenuId, cartId) => {
    const fixedQuantity = 1; 
    try {
      const response = await axios.post(
        'http://27.96.135.75/cart/info',
        {
          cart: {
            id : cartId
          },
          menu: { id: selectedMenuId },
          cartQuantity: fixedQuantity
        },
        { headers },
      );
      if (response.status === 200) {
        setCartItems([...cartItems, ...response.data.itemlist]);
        console.log("이거는 ", cartItems)
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
  const deleteCartItem = async (cartId, menuId) => {
    console.log(cartId)
    console.log("메뉴 아이디"+menuId)
    try {
      const response = await axios.delete(`http://27.96.135.75/cart/deletecartitem`, {
        headers: headers,
        params: {
          'cartId' : cartId,
          'menuId': menuId
        }
      });
      const updatedItems = cartItems.filter((item) => item.menu.id !== menuId);
      setCartItems(updatedItems);
      console.log(cartItems)
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
      const response = await axios.get('http://27.96.135.75/cart/member', { headers });
      if (response.status === 200) {
        setCartItems(response.data.itemlist);
      }
    } catch (error) {
      console.error('장바구니 메뉴 가져오기 오류', error);
    }
  };

  useEffect(() => {
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
