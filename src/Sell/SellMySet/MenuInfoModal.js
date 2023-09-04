import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
const MenuInfoModal = ({ open, handleClose, menuId, menus,updateMenus }) => {
  // menus를 props로 받음
  const accessToken = localStorage.getItem('accessToken');
  const selectedMenu = menus.find((menu) => menu.menuId === menuId); // menuId로 menu 정보를 찾음

  const [updatedMenu, setUpdatedMenu] = useState(selectedMenu); // 초기값을 selectedMenu로 설정

  useEffect(() => {
    const newSelectedMenu = menus.find((menu) => menu.menuId === menuId); // menuId가 변경되면 다시 찾음
    setUpdatedMenu(newSelectedMenu); // 그리고 updatedMenu를 업데이트
  }, [menuId, menus]);

  const handleInputChange = (e, field) => {
    setUpdatedMenu({
      ...updatedMenu,
      [field]: e.target.value,
    });
  };
  const handleSave = () => {
    updateMenus(updatedMenu); // updatedMenu 값이 채워져 있어야 함
    handleClose();
  };
  const handleDelete = async (menuId) => {
    try {
      // 모달창이 나옴 (예: '정말로 삭제하시겠습니까?')
      const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
      if (!confirmDelete) return;

      // DB에서 메뉴 삭제
      const response = await axios.delete(`/menu/info/deleteMenu/${menuId}`);

      if (response.status === 200) {
        alert('삭제가 완료되었습니다.');
        // 여기에 메뉴 목록을 다시 가져오는 로직이나, 상태 업데이트 로직을 넣을 수 있습니다.
        handleClose();
      }
    } catch (error) {
      console.error('메뉴 삭제 실패:', error);
      alert('삭제를 실패했습니다.');
    }
  };
  const handleModalClose = () => {
    setUpdatedMenu(null); // 원래의 selectedMenu 값으로 되돌림
    handleClose(); // 원래 handleClose 로직
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `/menu/update/${updatedMenu.menuId}`,
        updatedMenu,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert('수정이 완료되었습니다.');
        handleClose();
      }
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
      alert('수정을 실패했습니다.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>메뉴 수정</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="메뉴 이름"
          type="text"
          value={updatedMenu?.menuName || ''}
          fullWidth
          onChange={(e) => handleInputChange(e, 'menuName')}
        />
        <TextField
          margin="dense"
          id="content"
          label="메뉴 내용"
          type="text"
          value={updatedMenu?.menuContent || ''}
          fullWidth
          onChange={(e) => handleInputChange(e, 'menuContent')}
        />
        <TextField
          margin="dense"
          id="price"
          label="메뉴 가격"
          type="text"
          value={updatedMenu?.price || ''}
          fullWidth
          onChange={(e) => handleInputChange(e, 'price')}
        />
        <Button
          onClick={() => handleDelete(updatedMenu.menuId)}
          color="secondary"
        >
          삭제하기
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          취소
        </Button>
        <Button onClick={handleUpdate} color="primary">
          수정하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuInfoModal;
