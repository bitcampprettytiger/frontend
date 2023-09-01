import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ModalWindows = ({ info, onClose }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const goToVendorDetail = () => {
    // 상세 페이지로 이동
    console.log(info);
    navigate(`/shophome/${info.vendorid}`);
  };
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        {/* 이미지 대신 사용하려면 아래 주석을 해제하세요 */}
        {/* <img src={info.vendorImage} alt={info.vendorName} /> */}
        <Typography variant="h6">{info.vendorName}</Typography>

        <Typography variant="body1">{info.vendorAddress}</Typography>
        <Typography variant="body1">
          <img src={info.vendorimg} alt='이미지 있넝'></img>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
        <Button onClick={goToVendorDetail} color="primary">
          더보기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindows;
