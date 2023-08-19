import React, {useState} from 'react'
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyTakeout.css';
function MyTakeout() {

    // 예시 주문 데이터, 실제 코드에서는 서버로부터 가져온 데이터 사용
    const [orders, setOrders] = useState([
        {
            orderDate: '2023-08-20',
            orderDetailPage: '/order/1',
            storeInfo: {
                storeName: '탕후루후루',
                orderMenu: '딸기',
                totalPrice: 30000
            }
        },
        {
            orderDate: '2023-08-19',
            orderDetailPage: '/order/2',
            storeInfo: {
                storeName: '강남역 포장마차',
                orderMenu: '떡볶이',
                totalPrice: 15000
            }
        }
    ]);

    return (
        <div className='App-main2'>
            <Header page="mytakeout" />
            <div className='mytakeout-container'>
            <div className='mytakeout-list'>
                    {orders.map((order, index) => (
                        <div className='mytakeout-item' key={index}>
                            <div className='mytakeout-date'>{order.orderDate} 포장완료
                            <button 
                                onClick={() => window.location.href = order.orderDetailPage} 
                                className='mytakeout-detail-button'>
                                주문 상세
                            </button>
                            </div>
                            <div className='mytakeout-store'>
                                <img src="/path-to-your-third-image.jpg"/>
                            <div className='mytakeout-store-info'>
                                <p>{order.storeInfo.storeName}</p>
                                <div className='menu-detail'>
                                <p>{order.storeInfo.orderMenu}</p>
                                <p>{order.storeInfo.totalPrice}원</p>
                                </div>
                            </div>
                            </div>
                            <button
                                onClick={() => window.location.href = order.reviewPage}
                                className='mytakeout-review-button'>
                                리뷰 작성하기
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer type="mytakeout" />
        </div>
    )
};

export default MyTakeout;