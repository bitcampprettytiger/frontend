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

  // const socket = io('http://192.168.0.63:8081', { query: `phoneNumber=${phoneNumber}` });

  useEffect(() => {
    const getVendor = async () => {
      try {
        const response = await axios.get('http://192.168.0.240:1004/vendor/getVendorInfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
  
        console.log(response);
  
        if (response.data && response.data.item) {
          setVendor(response.data.item);
  
          // vendor 정보를 성공적으로 가져온 후에 소켓을 생성하고 이벤트를 보냅니다.
          const socket = io('http://192.168.0.63:8081', { query: `${response.data.item}` });
          setSocket(socket);
          
          socket.emit('enter_room', { data:`${response.data.item.id}`});
  
          // new_order 이벤트 리스너 설정

          socket.on('new_order', (data) => {
            console.log(`Received a new order from ${data.phoneNumber}:`, data.order,data.cartItems,data.orderArray);
            console.log(data.cartItems);
            // console.log("data.order");
            // console.log(data.order);
            // console.log("data.cartItems");
            // console.log(data.cartItems);
            // console.log("data.orderArray");
            // console.log(data.orderArray.cartItems);



            
            // 여기서 필요한 로직을 추가하여 주문 정보를 화면에 표시할 수 있습니다.
            // 예: 주문 목록 업데이트, 알림 메시지 표시 등
            setorder(prevOrders => [...prevOrders, data.cartItems]);
            alert("주문이 들어왔습니다.");
            console.log(data.cartItems);
          });
  
           // 컴포넌트가 언마운트될 때 소켓 연결 해제
          //  return () => {
          //    socket.disconnect();
          //  };
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    getVendor();
  }, []); 

  const handleWaitingClick = () => {
    setMessage('대기가 승인되었습니다.');
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handlePackagingClick = () => {
    setMessage('포장이 승인되었습니다.');
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <SellHeader></SellHeader>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          margin: 'auto',
          padding: 2,
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
          marginBottom: '10px',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ marginBottom: '2%', color: '#333' }}
        >
          줄서기 목록
        </Typography>
        <SHWaiting onClick={handleWaitingClick}></SHWaiting>
       {order.map((item, index) => (
        <SHOrder key={index} order={item} onClick={handlePackagingClick} />
      ))}        
      <Modal open={!!message}>
          <Box
            sx={{
              position: 'absolute',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant="h6" align="center">
              {message}<br />
              3초 후 사라집니다.
            </Typography>
          </Box>
        </Modal>
      </Box>
      {vendor ? <SellFooter vendorId={vendor.id}></SellFooter> : <SellFooter></SellFooter>}

    </>
  );
};

export default SellHome;
