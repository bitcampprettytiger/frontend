import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const primary = {
  main : '#FF745A'
}

function MenuOptionalModal({ open, onClose, selectedMenu, onMenuAdd }) {

  const handleConfirm = () => {
    onMenuAdd(selectedMenu);
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="menu-selection-description"
      PaperProps={{ 
        style: { 
          width: '30%', 
          height: '40%',
          maxHeight: 'none',
          maxWidth: 'none'
        }
      }}
    >
       <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span style={{ fontWeight: 'bold', fontSize: '130%' }}>
            {selectedMenu?.menuName}
          </span>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            mt: 'auto',
            width: '100%',
            paddingBottom: '10%',
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            sx={{
              backgroundColor: '#FF745A',
              color: 'white',
              '&:hover': {
                backgroundColor: '#E3634D',
              },
            }}
          >
            {`1개 담기 - ${selectedMenu?.price}원`}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default MenuOptionalModal;
