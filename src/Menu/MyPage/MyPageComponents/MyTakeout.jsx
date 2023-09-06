import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrderDetail, fetchPaymentList } from '../../Home/HomeComponents/HomeApi.jsx';
import './MyTakeout.css';
import { useInView } from 'react-intersection-observer';

function MyTakeout() {
    const [orderDetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');
    const [todayStoreCount, setTodayStoreCount] = useState(0);
    const [groupedOrders, setGroupedOrders] = useState({});
    const MEMBER_ID = localStorage.getItem('member_id');
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;


    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}, ${hh}:${min}`;
    };

    const fetchNextPage = () => {
        const nextPage = currentPage + 1;
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const nextPageData = orderDetail.slice(start, end);

        if (nextPageData.length === 0) {
            setHasMore(false);
            return;
        }

        setCurrentPage(nextPage);
        setOrders(prevOrders => [...prevOrders, ...nextPageData]);
    };


    useEffect(() => {
        const fetchOrderAndPaymentData = async () => {
            try {
                const orderData = await fetchOrderDetail(MEMBER_ID);
                const paymentData = await fetchPaymentList(token);
                const today = new Date().toISOString().split('T')[0];
                const todayOrders = orderData.filter(order => order.orderDate.split('T')[0] === today);
                const uniqueStores = [...new Set(todayOrders.map(order => order.storeName))];
                setTodayStoreCount(uniqueStores.length);

                setOrderDetail(orderData || []);

                const firstPageData = orderData.slice(0, itemsPerPage);
                setOrders(firstPageData);

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



    useEffect(() => {
        if (inView && hasMore) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
                <div className="order-summary">
                    <p><span className="boldText">{localStorage.getItem('nickname')}님의 주문 가게 </span><span className="boldNumber">{todayStoreCount}</span>개</p>
                    <p>결제내역 : 총 <span className="boldNumber">{orderDetail.length}</span> 개</p>
                </div>

                <ul className='mytakeout-list'>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
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
                                        <p>{order.vendor ? order.vendor.vendorName : "Vendor 이름 불러오기 실패"}</p>
                                        <div className='menu-detail'>
                                            <p className='gray'>{order.orderMenu}</p>
                                            <p>{order.totalPrice}원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="review-button-container">
                                    {!order.hasReviewed ? (
                                        <button
                                            className="mytakeout-review-button"
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
                <div ref={ref} style={{ textAlign: 'center' }}>
                    {hasMore ? "주문 내역 가져오는 중..." : ""}
                </div>
            </div>
            <Footer type="mytakeout" />
        </div>
    );
}

export default MyTakeout;