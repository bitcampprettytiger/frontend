import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
const MenuInfoModal = ({ open, handleClose, menuId, menus, updateMenus }) => {
  // menus를 props로 받음
  const accessToken = localStorage.getItem('accessToken');
  const selectedMenu = menus.find((menu) => menu.menuId === menuId);
  const [updatedMenu, setUpdatedMenu] = useState(selectedMenu || null);
  const [menuImage, setMenuImage] = useState(null);
  const [menuType, setMenuType] = useState('');

  useEffect(() => {
    const newSelectedMenu = menus.find((menu) => menu.id === menuId);
    setUpdatedMenu(newSelectedMenu);
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
  const handleImageChange = (e) => {
    setMenuImage(e.target.files[0]);
  };

  const handleTypeChange = (e) => {
    setMenuType(e.target.value);
  };
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
      if (!confirmDelete) return;

      const formData = new FormData();
      formData.append('id', menuId);
      const response = await axios.delete(
        `https://mukjachi.site:6443/menu/info/deleteMenu`,
        {
          data: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('삭제가 완료되었습니다.');

        handleClose();
        window.location.reload();
      }
    } catch (error) {
      alert('삭제를 실패했습니다.');
    }
  };

  const handleModalClose = () => {
    setUpdatedMenu(null); // 원래의 selectedMenu 값으로 되돌림
    handleClose(); // 원래 handleClose 로직
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', menuId);
      formData.append('menuName', updatedMenu.menuName);
      formData.append('menuContent', updatedMenu.menuContent);
      formData.append('price', updatedMenu.price);
      formData.append('menuType', updatedMenu.menuType);
      formData.append('primaryimage', updatedMenu.primaryimage);
      console.log('first',updatedMenu.primaryimage)
      // 추가적으로 필요한 필드가 있다면 이곳에 추가
      const response = await axios.put(
        `https://mukjachi.site:6443/menu/info/changeMenu`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // 필요한 경우에만 이 부분을 추가
          },
        }
      );
      if (response.status === 200) {
        alert('수정이 완료되었습니다.');
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
      if (error.response) {
        console.error('서버 에러:', error.response.data); // 서버에서 반환하는 에러 메시지
      }
      alert('수정을 실패했습니다.');
    }
  };
  useEffect(() => {}, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>메뉴 수정</DialogTitle>
      <DialogContent>
        {updatedMenu?.primaryimage ? (
          <img
            src={updatedMenu.primaryimage}
            alt="Menu"
            style={{ width: '100px', height: '100px' }}
          />
        ) : (
          'N:A'
        )}

        {/* 메뉴 타입을 보여주되, 수정 불가능하게 설정 */}

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="메뉴 타입"
          type="text"
          value={updatedMenu?.menuType || ''}
          fullWidth
          InputProps={{
            readOnly: true, // 수정 불가능하게 만들기
          }}
        />
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
          onClick={() => handleDelete(updatedMenu?.menuId)}
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
