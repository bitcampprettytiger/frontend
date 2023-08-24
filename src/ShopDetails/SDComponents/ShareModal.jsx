import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, Button, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';
import useShare from '../SDCustomHooks/useShare';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShareModal = ({ open, handleClose, vendorId }) => {
  const { shareToWeb, shareToKakao } = useShare(vendorId);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>{"Share to:"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          공유
        </DialogContentText>
        <Button variant="contained" color="primary" onClick={shareToWeb}>
          웹으로 공유하기
        </Button>
        <Button variant="contained" color="primary" onClick={shareToKakao}>
          카카오톡 공유하기
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
