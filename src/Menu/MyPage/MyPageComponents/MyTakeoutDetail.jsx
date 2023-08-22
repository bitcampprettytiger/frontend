import React, { useEffect, useState } from 'react'
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyTakeoutDetail.css';
import { useParams } from 'react-router-dom';
function MyTakeoutDetail() {

    const { orderNumber } = useParams();  // URL 파라미터로부터 주문 번호 가져오기
    const [orderDetail, setOrderDetail] = useState({
        orderDate: '2023-08-20',
        orderNumber: 'A1111',
        storeName: '탕후루후루',
        orderMenu: '딸기',
        totalPrice: 30000,
        storeTelNumber: '+01055559999'

    });  // 주문 상세 정보를 저장할 상태


    useEffect(() => {
        const orderDetail = async () => {
            try {
                // API를 호출하여 주문 상세 정보 가져오기
                const response = await fetch(`/order/${orderNumber}`);
                const data = await response.json();

                //상태 업데이트해서 주문 상세 정보 저장
                setOrderDetail(data);

            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        //비동기 함수 호출
        orderDetail();
    }, [orderNumber]);  //주문 번호 변경될 때마다 이펙트 재실행

    return (
        <div className='App-main2'>
            <Header page="mytakeoutdetail" />
            <div className='mytakeoutdetail-container'>
                <p>포장이 완료되었어요</p>
                <div className='mytakeout-detail'>
                    <div>
                        <div><strong>{orderDetail.storeName}</strong></div>
                        <div>{orderDetail.orderMenu}</div>
                        <div>{orderDetail.orderDate}</div>
                        <div>{orderDetail.orderNumber}</div>
                        <button
                            onClick={() => window.location.href = `tel:${orderDetail.storeTelNumber}`}
                            className='storeTelNumber'>가게 전화</button>
                        <button>가게 보기</button>
                        <div>{orderDetail.totalPrice}원</div>
                    </div>
                </div>

            </div>
            <Footer type="mytakeoutdetail" />
        </div>
    )
}

export default MyTakeoutDetail;