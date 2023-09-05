import React, { useEffect, useState } from 'react'
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyTakeoutDetail.css';
import { useParams } from 'react-router-dom';
import {IoIosCall} from 'react-icons/io';
import {BiStoreAlt} from 'react-icons/bi'

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
                <p className='takeout-complete'>포장이 완료되었어요</p>
                <div className='mytakeout-detail'>
                    <div>
                        <div className='tdstorename margin-btm'><strong>{orderDetail.storeName}</strong></div>
                        <div className='tdorderedate margin-btm'>주문일시 : {orderDetail.orderDate}</div>
                        <div className='tdordernum margin-btm'>주문번호 : {orderDetail.orderNumber}</div>
                        <div className='tdstoremenu margin-btm'>
                            {Array.isArray(orderDetail.orderMenu) ? (
                                orderDetail.orderMenu.map(menu => <div>{menu}</div>)
                            ) : (
                                <div>{orderDetail.orderMenu}</div>
                            )}
                        </div>
                        <div className='button-container margin-btm'>
                            <button
                                onClick={() => window.location.href = `tel:${orderDetail.storeTelNumber}`}
                                className='tdbtn'><IoIosCall className='tdicon'/>가게 전화</button>
                            <button className='tdbtn'><BiStoreAlt className='tdicon'/>재주문 하기</button>
                        </div>
                        <div className='tdprice margin-btm'>총 금액 | {orderDetail.totalPrice}원</div>
                        <div className='divider'></div>
                    </div>
                </div>
            </div>
            <Footer type="mytakeoutdetail" />
        </div>
    )
}

export default MyTakeoutDetail;