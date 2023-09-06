import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
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
  const navigate = useNavigate(); // 이 줄 추가
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

        setVendorType(data.vendorType || '');
        setSignatureMenu(data.sigmenu || '');
        setAddress(data.address || '');
        setVendorName(data.vendorName || '');
        setTel(data.tel || '');
        setBusinessDays(data.businessDay ? data.businessDay.split(',') : []);
        setBusinessHours({ start: data.open || '', end: data.close || '' });
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
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/vendorreview/${vendorId}`)} // 수정된 부분
            style={{ margin: '0 10px' }}
          >
            리뷰보기
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
      ) : modalType === 'edit' ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>가게 정보 수정</DialogTitle>
          <DialogContent>
            <SellVendorInfoInput
            // props (if any)
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
            <Button
              onClick={() => {
                // 저장 로직
                handleClose();
              }}
              color="primary"
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Grid>
  );
};

export default SellVendorInfo;
