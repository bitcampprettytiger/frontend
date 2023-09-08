import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import SHWaiting from './SHComponents/SHWaiting';
import SHOrder from './SHComponents/SHOrder';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { io } from 'socket.io-client';  

const SellHome = () => {
  const [message, setMessage] = useState(null);
  const [vendor, setVendor] = useState();
  const [socket, setSocket] = useState(null); // socket state 추가
  const [order, setorder] = useState([]);
  const [order2, setOrder2] = useState([]);
  const [orderdto, setorderdto] = useState([]);
  const [orderId, setorderId] = useState();
  const [waitingRef, waitingInView] = useInView({ threshold: 0.1 });
  const [orderRef, orderInView] = useInView({ threshold: 0.1 });
  const [hasMoreData, setHasMoreData] = useState(true);
  const isMobileView = window.innerWidth <= 767;

  const modalWidth = isMobileView ? '80%' : 'calc(0.8 * 0.3 * 100vw)';
  // const socket = io('https://mukjachi.site:8081', { query: `phoneNumber=${phoneNumber}` });


  const handleMoreWaiting = (newWaitingData) => {
    if (newWaitingData.length === 0) {
      setHasMoreData(false);
    } else {
      setorder(prevOrder => [...prevOrder, ...newWaitingData]);
    }
  };

  const handleMoreOrders = (newOrdersData) => {
    if (newOrdersData.length === 0) {
      setHasMoreData(false);
    } else {
      setOrder2(prevOrder => [...prevOrder, ...newOrdersData]);
    }
  };

  //줄서기 moredata 불러오기
  useEffect(() => {
    if (socket && waitingInView && hasMoreData) {
      const lastItem = order[order.length - 1];
      const lastItemId = lastItem ? lastItem.id : null;
      socket.emit('fetch_more_waiting', { lastItemId });
    }
  }, [waitingInView, socket]);


  //포장주문 moredata 불러오기
  useEffect(() => {
    if (socket && orderInView && hasMoreData) {
      const lastItem = order2[order2.length - 1];
      const lastItemId = lastItem ? lastItem.id : null;
      socket.emit('fetch_more_orders', { lastItemId });
    }
  }, [orderInView, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('more_waiting', handleMoreWaiting);
      socket.on('more_orders', handleMoreOrders);

      // 컴포넌트가 언마운트될 때 소켓 이벤트 리스너 해제
      return () => {
        socket.off('more_waiting', handleMoreWaiting);
        socket.off('more_orders', handleMoreOrders);
      };
    }
  }, [socket]);


  useEffect(() => {
    const getVendor = async () => {
      try {
        const response = await axios.get('https://mukjachi.site:6443/vendor/getVendorInfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        // console.log(response);

        if (response.data && response.data.item) {
          setVendor(response.data.item);

          // vendor 정보를 성공적으로 가져온 후에 소켓을 생성하고 이벤트를 보냅니다.
          const socketInstance = io('http://192.168.0.208:8081', { query: `${response.data.item}` });
          setSocket(socketInstance);

          socketInstance.emit('enter_room', { data: `${response.data.item.id}` });

          // new_order 이벤트 리스너 설정

          socketInstance.on('new_order', (data) => {
            console.log(`Received a new order from ${data.phoneNumber}:`, data.order, data.cartItems, data.orderArray);
            if (data.orderArray.orderId) {
              // console.log(data.orderArray.orderId)
              setorderId(data.orderArray.orderId);
            }




            // 여기서 필요한 로직을 추가하여 주문 정보를 화면에 표시할 수 있습니다.
            // 예: 주문 목록 업데이트, 알림 메시지 표시 등
            setorder(prevOrders => [...prevOrders, data.cartItems]);
            alert("주문이 들어왔습니다.");
            // console.log(data.cartItems);
          });

          // 컴포넌트가 언마운트될 때 소켓 연결 해제
          //  return () => {
          //    if (socketInstance) {
          //     socketInstance.disconnect();
          //  };
          socketInstance.on('more_waiting', handleMoreWaiting);
          socketInstance.on('more_orders', handleMoreOrders);
        }
      }
      catch (error) {
        console.log(error);
      }

    }

    getVendor();
  }, []);

  useEffect(() => {


    const getorder = async () => {
      try {
        const response = await axios.get(`https://mukjachi.site:6443/orders/orderDetail/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        // console.log("!!!!!!!!!!!!!response");
        // console.log(response);
        if (response.data && response.data.item) {
          console.log(response.data.item.orderedMenuDTOList[0]);
          console.log(response.data.item.orderedMenuDTOList)
          setOrder2(response.data.item.orderedMenuDTOList || []);

        }
      }
      catch (error) {
        console.log(error);
      }
    }
    if (orderId) {
      getorder();
    }
  }, [orderId]);

  const handleWaitingClick = () => {
    setMessage('대기가 승인되었습니다.');
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handlePackagingClick = () => {
    setMessage('포장이 승인되었습니다.');
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };



  return (
    <>
      <Box sx={{ width: '100%', height: '100vh', boxSizing: 'border-box' }}>
        <SellHeader></SellHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
            padding: '3%',
            backgroundColor: '#f5f5f5',
            height: '80vh',
            boxSizing: 'border-box'
          }}
        >

          <Box sx={{ height: '40vh', boxSizing: 'border-box' }} ref={waitingRef}>
            <Typography
              variant="h6"
              align="center"
              sx={{ margin: '2% 0', color: '#333', fontWeight: 'bold' }}
            >
              줄서기 목록
            </Typography>
            <SHWaiting onClick={handleWaitingClick}></SHWaiting>
          </Box>
          <Box sx={{ height: '40vh' }} ref={orderRef}>
            <Typography
              variant="h6"
              align="center"
              sx={{ margin: '2% 0', color: '#333', fontWeight: 'bold' }}
            >
              포장주문하기
            </Typography>
            {order2?.map((item, index) => (
              <SHOrder key={index} menu={item.menu} quantity={item.quantity} onClick={handlePackagingClick} />
            ))}
          </Box>
          <Modal open={!!message}>
            <Box
              sx={{
                position: 'relative',
                width: modalWidth,
                borderRadius: '5px',
                boxShadow: 24,
                p: 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxSizing: 'border-box',
                opacity: 1,
                background: 'white'
              }}
            >
              <Typography variant="h6" align="center">
                {message}<br />
                2초 후 사라집니다.
              </Typography>
            </Box>
          </Modal>
        </Box>
        {vendor ? <SellFooter vendorId={vendor.id}></SellFooter> : <SellFooter></SellFooter>}
      </Box>
    </>
  );
};

export default SellHome;