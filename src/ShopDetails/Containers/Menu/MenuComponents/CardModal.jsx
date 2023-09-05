import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const CardModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogContent style={{ textAlign: 'center' }}>
        <Typography variant="h6">결제가 완료되었습니다.</Typography>
      </DialogContent>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        padding={2}
      >
        <Button 
          variant="contained"
          onClick={onClose}
          sx= {{ textTransform: 'none', 
          fontSize: '1rem',
          background: '#FD5E53'  }}
        >
          확인
        </Button>
      </Box>
    </Dialog>
  );
};

export default CardModal;

