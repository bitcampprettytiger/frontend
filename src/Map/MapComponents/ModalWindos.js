import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ModalWindows = ({ info, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        {/* 이미지 대신 사용하려면 아래 주석을 해제하세요 */}
        {/* <img src={info.vendorImage} alt={info.vendorName} /> */}
        <Typography variant="h6">{info.vendorName}</Typography>

        <Typography variant="body1">{info.vendorAddress}</Typography>
        <Typography variant="body1">이미지</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
        <Button
          onClick={() => {
            /* 더 보기 로직 */
          }}
          color="primary"
        >
          더보기
        </Button>
        <Button color="primary">찜하기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindows;
