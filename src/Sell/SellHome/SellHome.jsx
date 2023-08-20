import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import SHWaiting from './SHComponents/SHWaiting';
import SHOrder from './SHComponents/SHOrder';

const SellHome = () => {
  const [message, setMessage] = useState(null);

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
        <SHWaiting onClick={handleWaitingClick}></SHWaiting>
        <SHOrder onClick={handlePackagingClick}></SHOrder>
      </Typography>
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
            {message}<br/>
             3초 후 사라집니다.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default SellHome;
