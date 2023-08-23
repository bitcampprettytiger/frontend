import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Dialog, DialogContent } from '@mui/material';

const SSUAddressModal = ({ open, onClose, onComplete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DaumPostcode onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
};

export default SSUAddressModal;
