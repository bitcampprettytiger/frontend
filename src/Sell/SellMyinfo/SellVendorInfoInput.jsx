import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const SellVendorInfoInput = ({
  open,
  handleClose,
  vendorType,
  signatureMenu,
  address,
  businessHours,
  businessDays,
}) => {
  const [newVendorType, setNewVendorType] = useState(vendorType);
  const [newSignatureMenu, setNewSignatureMenu] = useState(signatureMenu);
  const [newAddress, setNewAddress] = useState(address);
  const [newBusinessHours, setNewBusinessHours] = useState(businessHours);
  const [newBusinessDays, setNewBusinessDays] = useState(businessDays);

  const handleSave = async () => {
    try {
      await axios.put(
        'http://localhost/vendor/info',
        {
          vendorType: newVendorType,
          signatureMenu: newSignatureMenu,
          address: newAddress,
          businessHours: newBusinessHours,
          businessDays: newBusinessDays,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      handleClose();
    } catch (error) {
      console.error('Could not update vendor info:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>영업 정보 수정</DialogTitle>
      <DialogContent>
        <TextField
          label="가게 타입"
          defaultValue={newVendorType}
          onChange={(e) => setNewVendorType(e.target.value)}
          fullWidth
          sx={{ margin: '5% 0' }}
        />
        <TextField
          label="대표 메뉴"
          defaultValue={newSignatureMenu}
          onChange={(e) => setNewSignatureMenu(e.target.value)}
          fullWidth
        />
        <TextField
          label="주소"
          defaultValue={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          fullWidth
          sx={{ margin: '5% 0' }}
        />
        {/* 이 부분은 시간 형식에 맞추어 상태를 관리해 주어야 합니다 */}
        <TextField
          label="영업 시간"
          defaultValue={`${newBusinessHours.start} - ${newBusinessHours.end}`}
          fullWidth
        />
        {/* 이 부분은 일자 형식에 맞추어 상태를 관리해 주어야 합니다 */}
        <TextField
          label="영업 일"
          defaultValue={newBusinessDays.join(', ')}
          fullWidth
          sx={{ margin: '5% 0' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSave} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellVendorInfoInput;
