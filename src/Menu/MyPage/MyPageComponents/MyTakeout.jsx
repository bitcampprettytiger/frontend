import React from 'react';
import useOrders from '../../MyPageCustomHooks/useOrders.jsx';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import { useNavigate, Link } from 'react-router-dom';
import './MyTakeout.css';

function MyTakeout() {

    const navigate = useNavigate();

    const initialOrders = [
        {
            orderDate: '2023-08-20',
            orderNumber: 'A1111',
            storeName: '탕후루후루',
            orderMenu: '딸기',
            totalPrice: 30000
        },
        {
            orderDate: '2023-08-19',
            orderNumber: 'A1112',
            storeName: '강남역 포장마차',
            orderMenu: '떡볶이',
            totalPrice: 15000
        }
    ];
    const [orders, setOrders] = useOrders(initialOrders);


    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
                <div className='mytakeout-list'>
                    {orders.map((order, index) => (
                        <div className='mytakeout-item' key={index}>
                            <div className='mytakeout-date'>{order.orderDate} 포장완료
                                <Link to={`/order/${order.orderNumber}`} className='mytakeout-detail-button'>
                                    주문 상세
                                </Link>


                            </div>
                            <div className='mytakeout-store'>
                                <img src="/images/roopy.png" />
                                <div className='mytakeout-store-info'>
                                    <p>{order.storeName}</p>
                                    <div className='menu-detail'>
                                        <p>{order.orderMenu}</p>
                                        <p>{order.totalPrice}원</p>
                                    </div>
                                </div>
                            </div>
                            <Link to="/reviewform" className='mytakeout-review-button'>
                                <button>
                                    리뷰 작성하기
                                </button>
                            </Link>


                        </div>
                    ))}
                </div>
            </div>
            <Footer type="mytakeout" />
        </div>
    )
};

export default MyTakeout;