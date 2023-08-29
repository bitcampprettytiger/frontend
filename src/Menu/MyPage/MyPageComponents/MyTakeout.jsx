import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { getMyCart, deleteCart } from '../../Home/HomeComponents/HomeApi.jsx';
import './MyTakeout.css';

function MyTakeout() {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    let payload = null;
    if (token) {
        payload = JSON.parse(atob(token.split('.')[1]));
    }
    const USER_ID = payload?.userId;

    useEffect(() => {
        if (USER_ID && token) {
            getMyCart(USER_ID, token)
                .then(response => {
                    console.log(response);
                    setCartItems(response.data.itemlist);
                })
                .catch(error => {
                    console.error("Error fetching cart:", error);
                });
        }
    }, [USER_ID, token]);

    function clearCart() {
        deleteCart(USER_ID, token)
            .then(response => {
                setCartItems([]);
            })
            .catch(error => {
                console.error("Error clearing cart:", error);
            });
    }

    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
                <div className='mytakeout-list'>
                    {orders.map((order, index) => (
                        <div className='mytakeout-item' key={index}>
                            <div className='mytakeout-date'>
                                {order.orderDate} 포장완료
                                <Link to={`/order/${order.orderNumber}`} className='mytakeout-detail-button'>
                                    주문 상세
                                </Link>
                            </div>
                            <div className='mytakeout-store'>
                                <img src="/images/roopy.png" alt="Store Logo" />
                                <div className='mytakeout-store-info'>
                                    <p>{order.storeName}</p>
                                    <div className='menu-detail'>
                                        <p>{order.orderMenu}</p>
                                        <p>{order.totalPrice}원</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/reviewform')}
                                className='mytakeout-review-button'>
                                리뷰 작성하기
                            </button>
                            <button
                                onClick={clearCart}
                                className='clear-cart-button'>
                                포장 주문 내역 삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer type="mytakeout" />
        </div>
    );
}

export default MyTakeout;
