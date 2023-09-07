import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrderDetail, fetchPaymentList, API_BASE_URL } from '../../Home/HomeComponents/HomeApi.jsx';
import './MyTakeout.css';
import ReviewForm from '../../../ShopDetails/Containers/Review/ReviewComponents/ReviewForm.jsx';

function MyTakeout() {
    const [orderDetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');
    const [todayStoreCount, setTodayStoreCount] = useState(0);
    const [groupedOrders, setGroupedOrders] = useState({});
    const MEMBER_ID = localStorage.getItem('member_id');
    const navigate = useNavigate();
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState();



    // useRef를 사용하여 token과 MEMBER_ID를 관리
    const tokenRef = useRef(localStorage.getItem('accessToken'));
    const MEMBER_ID_Ref = useRef(localStorage.getItem('member_id'));

    const openReviewForm = (order) => {
        setSelectedOrder(order);
        setIsReviewFormOpen(true);
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString + "Z"); // 'Z'는 UTC를 나타냅니다.


        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}, ${hh}:${min}`;
    };

    const handleReviewSubmit = () => {
        // 리뷰 제출 로직을 추가해주세요.
        setIsReviewFormOpen(false);
    };

    useEffect(() => {
        const fetchOrderAndPaymentData = async () => {
            try {
                const orderData = await fetchOrderDetail(MEMBER_ID);
                console.log("Order data:", orderData);  // 주문 데이터 로깅

                const paymentData = await fetchPaymentList(token);
                console.log("Payment data:", paymentData);  // 결제 데이터 로깅

                const today = new Date().toISOString().split('T')[0];
                const todayOrders = orderData.filter(order => order.orderDate && order.orderDate.split('T')[0] === today);
                console.log("Today's orders:", todayOrders);  // 오늘의 주문 로깅

                const uniqueStores = [...new Set(todayOrders.map(order => order.vendorName))];
                console.log("Unique stores:", uniqueStores);  // 고유 상점 로깅

                setOrders(orderData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) || []);
                setOrderDetail(orderData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) || []);
                setTodayStoreCount(uniqueStores.length);

                const groupedData = {};
                orderData.forEach(order => {
                    const key = order.orderDate
                        ? `${order.vendor.vendorName}-${order.orderDate.split('T')[0]}-${new Date(order.orderDate).getHours()}:${new Date(order.orderDate).getMinutes()}`
                        : '';

                    if (key && !groupedData[key]) {
                        groupedData[key] = [];
                    }
                    groupedData[key].push(order);
                });
                console.log("Grouped data:", groupedData);  // 그룹화된 데이터 로깅

                const aggregatedOrders = Object.values(groupedData).map(group => {
                    const totalPrice = group.reduce((sum, order) => sum + order.totalPrice, 0);
                    return { ...group[0], totalPrice, orderCount: group.length };
                });
                console.log("Aggregated orders:", aggregatedOrders);  // 집계된 주문 로깅

                setOrders(aggregatedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) || []);
            } catch (error) {
                console.error("Error fetching order and payment data:", error);
            }
        };

        fetchOrderAndPaymentData();
    }, []);

    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
                <div className="order-summary">
                    <p><span className="boldText">{localStorage.getItem('nickname')}님, 오늘 주문한 가게는</span> <span className="boldNumber">{todayStoreCount}</span>개입니다.</p>
                    <p>결제 내역 : 총 <span className="boldNumber">{orderDetail.length}</span> 건</p>
                </div>

                <ul className='mytakeout-list'>
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => {
                            // 첫 번째 메뉴 이름을 구합니다.
                            const firstMenuName = order.orderedMenuDTOList && order.orderedMenuDTOList[0] && order.orderedMenuDTOList[0].menu && order.orderedMenuDTOList[0].menu.menuName;
                            // 전체 메뉴 개수를 구합니다.
                            const totalMenus = order.orderedMenuDTOList ? order.orderedMenuDTOList.length : 0;

                            return (
                                <li className='mytakeout-item' key={order.id || index}>
                                    <div className='mytakeout-date'>
                                        {formatDateTime(order.orderDate)} 포장 완료
                                        <Link to={`/mytakeoutdetail/order/${order.orderId}`} className='mytakeout-detail-button'>
                                            주문 상세
                                        </Link>
                                    </div>
                                    <div className='mytakeout-store'>
                                        <img src={order.vendorImageDtos[0].url || "/images/roopy.png"} alt={order.vendor.vendorName} />
                                        <div className='mytakeout-store-info'>
                                            <p className='store-name'>{order.vendor.vendorName}</p>
                                            <div className='menu-detail'>
                                                <p className='gray'>
                                                    {firstMenuName} 외 {totalMenus - 1}개
                                                </p>
                                                <p>{order.totalPrice.toLocaleString()}원</p>
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
                                            <p>리뷰 작성 완료</p>
                                        )}
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p>주문 내역이 없습니다.</p>
                    )}
                </ul>
                {isReviewFormOpen && <ReviewForm mytakeoutData={selectedOrder} onReviewSubmit={handleReviewSubmit} />}
            </div>
            <Footer type="mytakeout" />
        </div>
    );
};

export default MyTakeout;