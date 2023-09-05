import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import SellVendorInfoInput from './SellVendorInfoInput';

const SellVendorInfo = () => {
  const [open, setOpen] = useState(false);
  const [vendorType, setVendorType] = useState('');
  const [signatureMenu, setSignatureMenu] = useState('');
  const [address, setAddress] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [tel, setTel] = useState('');
  const [businessDays, setBusinessDays] = useState([]);
  const [businessHours, setBusinessHours] = useState({ start: '', end: '' });
  const { vendorId } = useParams();
  const [modalType, setModalType] = useState(null);

  const handleOpen = (type) => {
    setOpen(true);
    setModalType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mukjachi.site:6443/vendor/infoDetail/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        const data = response.data;

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('vendorType', data.vendorType || '');
        formData.append('signatureMenu', data.sigmenu || '');
        formData.append('address', data.address || '');
        formData.append('vendorName', data.vendorName || '');
        formData.append('tel', data.tel || '');
        formData.append(
          'businessDays',
          data.businessDay ? data.businessDay.split(',').join(',') : ''
        );
        formData.append(
          'businessHours',
          JSON.stringify({ start: data.open || '', end: data.close || '' })
        );

        // 상태 설정
        setVendorType(data.vendorType || '');
        setSignatureMenu(data.sigmenu || '');
        setAddress(data.address || '');
        setVendorName(data.vendorName || '');
        setTel(data.tel || '');
        setBusinessDays(data.businessDay ? data.businessDay.split(',') : []);
        setBusinessHours({ start: data.open || '', end: data.close || '' });

        // 필요한 경우 formData를 사용하여 다른 axios 요청을 수행할 수 있습니다.
      } catch (error) {
        console.error('Could not fetch vendor info:', error);
      }
    };

    fetchData();
  }, [vendorId]);

  return (
    <Grid container spacing={3} sx={{ padding: '0 5%' }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          가게 정보
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="가게 이름"
          variant="outlined"
          value={vendorName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="가게 타입"
          variant="outlined"
          value={vendorType}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="가게 대표 메뉴"
          variant="outlined"
          value={signatureMenu}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="가게 주소"
          variant="outlined"
          value={address}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label="가게 번호" variant="outlined" value={tel} fullWidth />
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: '5% 0' }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen('info')}
            style={{ margin: '0 10px' }}
          >
            영업 정보 보기
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen('edit')}
            style={{ margin: '0 10px' }}
          >
            수정하기
          </Button>
        </Grid>
      </Grid>
      {modalType === 'info' ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>영업 정보</DialogTitle>
          <DialogContent>
            <DialogContentText>
              영업 시간: {businessHours.start} - {businessHours.end}
            </DialogContentText>
            <DialogContentText>
              영업 일: {businessDays.join(', ')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {modalType === 'edit' ? (
        <SellVendorInfoInput
          open={open}
          handleClose={handleClose}
          vendorType={vendorType}
          signatureMenu={signatureMenu}
          address={address}
          businessHours={businessHours}
          businessDays={businessDays}
        />
      ) : null}
    </Grid>
  );
};

export default SellVendorInfo;
