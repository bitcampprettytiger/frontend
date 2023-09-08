import React, { useEffect, useState } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyTakeoutDetail.css';
import { useParams } from 'react-router-dom';
import { fetchMyOrders } from '../../Home/HomeComponents/HomeApi.jsx';
import Divider from '@mui/material/Divider';
import CallIcon from '@mui/icons-material/Call';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';


// React 컴포넌트 시작
function MyTakeoutDetail() {
    const navigate = useNavigate();

    const { orderId } = useParams();
    console.log("컴포넌트가 마운트됨. orderId 값:", orderId);

    const [orderDetail, setOrderDetail] = useState(null);

    const onViewLocation = () => {
        if (orderDetail && orderDetail.vendor) {
            navigate(`/shopInfo/${orderDetail.vendor.vendorId}/location`);
        }
    };

    // 날짜와 시간 형식 변환 함수
    const formatDateTime = (isoString) => {
        const date = new Date(isoString + "Z"); // 'Z'는 UTC를 나타냅니다.


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
                const vendorOrders = await fetchMyOrders();
                const specificOrder = vendorOrders.find(order => order.orderId === parseInt(orderId)); // 여기를 수정
                if (!specificOrder) {
                    throw new Error('Order not found');
                }
                setOrderDetail(specificOrder);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        };
        fetchOrderDetail();
    }, [orderId]);

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
                        <p>{orderDetail && orderDetail.vendor ? orderDetail.vendor.vendorName : "가게명"}</p>
                        <p>
                            {orderDetail && orderDetail.orderedMenuDTOList ? formattedMenu(orderDetail.orderedMenuDTOList) : "데이터 로딩 중..."}
                        </p>
                        <p>
                            주문일시 : {orderDetail && (formatDateTime(orderDetail.orderDate))}
                        </p>
                        <p>
                            주문번호 : {orderDetail && (orderDetail.orderId)}
                        </p>
                        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <Button
                                component="a"
                                href={`tel:${orderDetail && orderDetail.vendor ? orderDetail.vendor.tel : "#"}`}
                                startIcon={<CallIcon />}
                                variant="outlined"
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                가게전화
                            </Button>

                            <Button
                                onClick={onViewLocation}
                                startIcon={<FmdGoodIcon />}
                                variant="outlined"
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                위치보기
                            </Button>
                        </Box>

                        <ul>
                            {orderDetail && orderDetail.orderedMenuDTOList
                                ? orderDetail.orderedMenuDTOList.map((menuDetail, index) => (
                                    <li key={index}>
                                        {menuDetail.menu.menuName}
                                    </li>
                                ))
                                : <li>메뉴 정보 없음</li>
                            }
                        </ul>


                        <p>{orderDetail.totalPrice} 원</p>

                        <Divider variant="middle" style={{ height: '4px', margin: '10px 0' }} />

                        <p>총결제금액 : {orderDetail.totalPrice} 원</p>
                        <Divider variant="middle" style={{ height: '4px', margin: '10px 0' }} />
                        <p>결제방법 : 카드결제</p>
                        <Divider variant="middle" style={{ height: '4px', margin: '10px 0' }} />
                        <p>가게주소</p>
                        <p style={{ color: "#555555" }}>
                            {orderDetail && orderDetail.vendor.address ? orderDetail.vendor.address : "주소 정보 로딩 중..."}
                        </p>
                    </div>
                </div>
            </div>
            <Footer type="mytakeoutdetail" />
        </div>
    );
}

export default MyTakeoutDetail;
