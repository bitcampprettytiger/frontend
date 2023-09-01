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

    useEffect(() => {
        // 주문과 결제 정보를 가져오는 비동기 함수
        const fetchOrderAndPaymentData = async () => {
            try {
                // 주문 상세 정보를 가져옵니다.
                const orderData = await fetchOrderDetail(MEMBER_ID);
                console.log("이건 상세정보", orderData);
                // 현재 날짜를 ISO 형식으로 가져옵니다.
                const today = new Date().toISOString().split('T')[0];

                // 오늘의 주문만 필터링합니다.
                const todayOrders = orderData.filter(order => order.orderDate.split('T')[0] === today);

                // 중복되지 않은 가게 이름만 가져옵니다.
                const uniqueStores = [...new Set(todayOrders.map(order => order.storeName))];

                // 결제 내역을 가져옵니다.
                const paymentData = await fetchPaymentList(token);

                // 주문 상세 정보를 상태에 저장합니다.
                setOrderDetail(orderData || []);

                // 오늘의 가게 개수를 상태에 저장합니다.
                setTodayStoreCount(uniqueStores.length);

                // 주문 정보를 날짜별로 그룹화합니다.
                const groups = {};
                orderData.forEach(order => {
                    const date = order.orderDate.split('T')[0];
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(order);
                });

                // 날짜별로 그룹화된 주문을 상태에 저장합니다.
                setGroupedOrders(groups);

            } catch (error) {
                // 에러가 발생하면 상태에 에러를 저장합니다.
                setError(error);
            }
        };

        // 위에서 정의한 비동기 함수를 호출합니다.
        fetchOrderAndPaymentData();

    }, []); // useEffect는 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    if (error) {
        return <div>Error: {error.message}</div>; // 에러가 있으면 에러 메시지를 표시합니다.
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
                                    {order.orderDate} 포장완료
                                    <Link to={`/order/${order.orderNumber}`} className='mytakeout-detail-button'>
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
                                    <button
                                        className="write-review-button"
                                        onClick={() => {
                                            console.log("주문이되나여?", order);
                                            console.log("아이디는 찍히나?", order.id);
                                            console.log("가게아이디는?", order.vendorId);

                                            navigate(`/ReviewForm/${order.id}/${order.vendor.id}`); // ReviewForm 페이지로 이동하면서 order.id와 vendorId를 전달
                                        }}
                                    >
                                        리뷰 작성하기
                                    </button>
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
