import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModalWindows = ({ info, onClose }) => {
  const navigate = useNavigate();

  const goToVendorDetail = () => {
    navigate(`/shophome/${info.vendorid}`);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6">{info.vendorName}</Typography>
        <Typography variant="body1">{info.vendorAddress}</Typography>
        <div
          style={{
            width: '50%', // 전체 크기의 50%
            margin: 'auto', // 가운데 정렬
            textAlign: 'center', // 내부 요소 가운데 정렬
          }}
        >
          <img
            src={info.vendorimg}
            alt='이미지 있넝'
            style={{
              height:'30vh',
              width: '100%', // 부모 컨테이너에 꽉 채우기
            }}
          />
        </div>
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
