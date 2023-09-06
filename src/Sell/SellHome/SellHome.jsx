import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import SHWaiting from './SHComponents/SHWaiting';
import SHOrder from './SHComponents/SHOrder';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import axios from 'axios';
import { io } from 'socket.io-client';

const SellHome = () => {
  const [message, setMessage] = useState(null);
  const [vendor, setVendor] = useState();
  const [socket, setSocket] = useState(null); // socket state 추가
  const [order, setorder] = useState([]);
  const [order2, setOrder2] = useState([]);
  const [orderdto, setorderdto] = useState([]);
  const [orderId, setorderId] = useState();
  // const socket = io('https://mukjachi.site:8081', { query: `phoneNumber=${phoneNumber}` });

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
          const socket = io('http://192.168.0.95:8081', { query: `${response.data.item}` });
          setSocket(socket);

          socket.emit('enter_room', { data: `${response.data.item.id}` });

          // new_order 이벤트 리스너 설정

          socket.on('new_order', (data) => {
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
          //    socket.disconnect();
          //  };
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
      <Box sx={{ width: '100%', height: '100vh' }}>
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
            marginBottom: '10px',
            height: '79vh',
          }}
        >

          <Box sx={{ height: '40vh' }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ margin: '2% 0', color: '#333', fontWeight: 'bold' }}
            >
              줄서기 목록
            </Typography>
            <SHWaiting onClick={handleWaitingClick}></SHWaiting>
          </Box>
          <Box sx={{ height: '40vh' }}>
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
                position: 'absolute',
                width: '80%',
                borderRadius: '5px',
                boxShadow: 24,
                p: 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
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