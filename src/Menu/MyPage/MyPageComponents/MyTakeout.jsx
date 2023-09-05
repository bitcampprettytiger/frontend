import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrderDetail, fetchPaymentList } from '../../Home/HomeComponents/HomeApi.jsx';
import './MyTakeout.css';

function MyTakeout() {
    const [orderDetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');
    const [todayStoreCount, setTodayStoreCount] = useState(0);
    const [groupedOrders, setGroupedOrders] = useState({});
    const MEMBER_ID = localStorage.getItem('member_id');
    const navigate = useNavigate();

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}, ${hh}:${min}`;
    };


    useEffect(() => {
        const fetchOrderAndPaymentData = async () => {
            try {
                const orderData = await fetchOrderDetail(MEMBER_ID);
                const today = new Date().toISOString().split('T')[0];
                const todayOrders = orderData.filter(order => order.orderDate.split('T')[0] === today);
                const uniqueStores = [...new Set(todayOrders.map(order => order.storeName))];
                const paymentData = await fetchPaymentList(token);

                setOrderDetail(orderData || []);
                setTodayStoreCount(uniqueStores.length);

                const groups = {};
                orderData.forEach(order => {
                    const date = order.orderDate.split('T')[0];
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(order);
                });

                setGroupedOrders(groups);

            } catch (error) {
                setError(error);
            }
        };

        fetchOrderAndPaymentData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
                <div className="order-summary">
                    <p>{localStorage.getItem('nickname')}님이 오늘 주문한 가게는 {todayStoreCount}개 입니다.</p>
                    <p>총 {orderDetail.length} 개의 결제 내역이 있습니다.</p>
                </div>
                <ul className='mytakeout-list'>
                    {orderDetail.length > 0 ? (
                        orderDetail.map((order, index) => (
                            <li className='mytakeout-item' key={order.id || index}>
                                <div className='mytakeout-date'>
                                    {formatDateTime(order.orderDate)} 포장완료
                                    <Link to={`/mytakeoutdetail/order/${order.orderId}`} className='mytakeout-detail-button'>
                                        주문 상세
                                    </Link>
                                </div>
                                <div className='mytakeout-store'>
                                    <img src="/images/roopy.png" alt="Store Logo" />
                                    <div className='mytakeout-store-info'>
                                        <p>{order.menuType}</p>
                                        <div className='menu-detail'>
                                            <p>{order.orderMenu}</p>
                                            <p>{order.totalPrice}원</p>
                                        </div>
                                    </div>
                                    {!order.hasReviewed ? (
                                        <button
                                            className="write-review-button"
                                            disabled={!order || !"orderId" in order || !"id" in order.vendor}
                                            onClick={() => {
                                                if (order && "orderId" in order && "id" in order.vendor) {
                                                    navigate(`/ReviewForm/${order.orderId}/${order.vendor.id}`);
                                                } else {
                                                    console.error("order, order.orderId or order.vendor.id is undefined!");
                                                }
                                            }}
                                        >
                                            리뷰 작성하기
                                        </button>
                                    ) : (
                                        <p>리뷰 작성완료</p>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>주문 내역이 없습니다.</p>
                    )}
                </ul>
            </div>
            <Footer type="mytakeout" />
        </div>
    );
}

export default MyTakeout;