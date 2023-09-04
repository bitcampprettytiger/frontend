import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const MenuInfoModal = ({
  open,
  handleClose,
  menu,
  handleStockChange,
  handleDelete,
}) => {
  if (!menu) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>메뉴 수정</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="type"
          label="메뉴 종류"
          type="text"
          value={menu.menuType || ''}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="메뉴 이름"
          type="text"
          value={menu.menuName || ''}
          fullWidth
          // onChange={...}
        />
        <TextField
          margin="dense"
          id="content"
          label="메뉴 내용"
          type="text"
          value={menu.menuContent || ''}
          fullWidth
          // onChange={...}
        />
        <TextField
          margin="dense"
          id="price"
          label="메뉴 가격"
          type="text"
          value={menu.price || ''}
          fullWidth
          // onChange={...}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={menu.outOfStock}
              onChange={() => {
                handleStockChange(menu.menuId, !menu.outOfStock);
              }}
              name="outOfStock"
            />
          }
          label="품절"
        />
        <Button
          onClick={() => {
            // 삭제 로직을 실행
            handleDelete(menu.menuId);
            handleClose();
          }}
          color="secondary"
        >
          삭제하기
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button
          onClick={() => {
            // 수정 로직을 구현하세요
            handleClose();
          }}
          color="primary"
        >
          수정하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuInfoModal;
