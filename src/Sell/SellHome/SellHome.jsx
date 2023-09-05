import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import SHWaiting from './SHComponents/SHWaiting';
import SHOrder from './SHComponents/SHOrder';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';
import axios from 'axios';

const SellHome = () => {
  const [message, setMessage] = useState(null);
  const [vendor, setVendor] = useState();

  useEffect(() => {
    const getVendor = async () => {
      try {
        const response = await axios.get('https://mukjachi.site:6443/vendor/getVendorInfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        console.log(response);

        if (response.data && response.data.item) {
          setVendor(response.data.item);
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
      <Box sx={{width: '100%', height: '100vh'}}>
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
          height:'79vh',
        }}
      >

        <Box sx={{height: '40vh'}}>
          <Typography
          variant="h6"
          align="center"
          sx={{ margin: '2% 0', color: '#333', fontWeight: 'bold' }}
        >
          줄서기 목록
        </Typography>
        <SHWaiting onClick={handleWaitingClick}></SHWaiting>
        </Box>
        <Box sx={{height: '40vh'}}>
        <Typography
          variant="h6"
          align="center"
          sx={{ margin: '2% 0', color: '#333', fontWeight: 'bold' }}
        >
          포장주문하기
        </Typography>
        <SHOrder onClick={handlePackagingClick}></SHOrder>
        </Box>
        <Modal open={!!message}>
          <Box
            sx={{
              position: 'absolute',
              width: '80%',
              borderRadius:'5px',
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
