import React, { useEffect, useState } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyTakeoutDetail.css';
import { useParams } from 'react-router-dom';
import {IoIosCall} from 'react-icons/io';
import {BiStoreAlt} from 'react-icons/bi'
import { fetchVendorOrders } from '../../Home/HomeComponents/HomeApi.jsx';

// React 컴포넌트 시작
function MyTakeoutDetail() {
    const { orderId, vendorId } = useParams();
    console.log("컴포넌트가 마운트됨. orderId 값:", orderId, "vendorId 값:", vendorId); // 1번 위치

    const [orderDetail, setOrderDetail] = useState(null);

    // 날짜와 시간 형식 변환 함수
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}, ${hh}:${min}`;
    };

    // 메뉴 형식 변환 함수
    const formattedMenu = (orderedMenuList) => {
        if (orderedMenuList.length === 0) return '메뉴 없음';
        return orderedMenuList.length > 1
            ? `${orderedMenuList[0].menu.menuName} 외 ${orderedMenuList.length - 1}개`
            : orderedMenuList[0].menu.menuName;
    };

    // 주문 상세 정보 가져오는 useEffect
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                console.log("fetchOrderDetail 함수가 호출됨"); // 2번 위치
                const vendorOrders = await fetchVendorOrders(vendorId);
                console.log("fetchVendorOrders 반환 값:", vendorOrders); // 3번 위치

                // orderId 해당하는 주문만 필터링
                const specificOrder = vendorOrders.find(order => order.orderDate === orderId);
                console.log("specificOrder 값:", specificOrder); // 4번 위치


                if (!specificOrder) {
                    throw new Error('Order not found');
                }
                setOrderDetail(specificOrder);

            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };

        fetchOrderDetail();
    }, [orderId, vendorId]);

    // 주문 상세 정보가 없을 때 렌더링
    if (!orderDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className='App-main2'>
            <Header page="mytakeoutdetail" />
            <div className='mytakeoutdetail-container'>
                <p className='takeout-complete'>포장이 완료되었어요</p>
                <div className='mytakeout-detail'>
                    <div>
                        <div className='tdstorename margin-btm'><strong>{orderDetail.item.member ? orderDetail.item.member.shopName : "가게명"}</strong></div>
                        <div className='tdorderedate margin-btm'>주문일시 : {formatDateTime(orderDetail.item.orderDate)}</div>
                        <div className='tdordernum margin-btm'>주문번호 : {orderDetail.item.orderDate}</div>
                        <div className='tdstoremenu margin-btm'>
                            {Array.isArray(orderDetail.orderMenu) ? (
                                orderDetail.orderMenu.map(menu => <div>{menu}</div>)
                            ) : (
                                <div>{formattedMenu(orderDetail.item.orderedMenuDTOList)}</div>
                            )}
                        </div>
                        <div className='button-container margin-btm'>
                            <button
                                onClick={() => window.location.href = `tel:${orderDetail.storeTelNumber}`}
                                className='tdbtn'><IoIosCall className='tdicon'/>가게 전화</button>
                            <button className='tdbtn'><BiStoreAlt className='tdicon'/>재주문 하기</button>
                        </div>
                           <ul>
                            {orderDetail.item.orderedMenuDTOList.map((menuDetail, index) => (
                                <li key={index}>
                                    {menuDetail.menu.menuName}
                                </li>
                            ))}
                        </ul>
                        <div className='tdprice margin-btm'>총 금액 | {orderDetail.item.totalPrice}원</div>
                        <div className='divider'></div>
                        <p>결제방법 : 카드결제</p> {/* 실제 결제 방법 정보가 주어진다면 이 부분을 수정해야 함 */}
                    </div>
                </div>
            </div>
            <Footer type="mytakeoutdetail" />
        </div>
    );
}

export default MyTakeoutDetail;
