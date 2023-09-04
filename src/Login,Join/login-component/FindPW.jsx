import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const FindPW = ({ openModal, handleModalClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetState = () => {
    setPhoneNumber('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsVerified(false);
    setErrorMessage('');
  };

  const findPhoneNumber = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.240/member/findPhoneNumber',
        {
          phoneNumber,
        }
      );
      if (response.data.success) {
        setIsVerified(true);
        setErrorMessage('');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('전화번호를 찾을 수 없습니다.');
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.0.240/member/updatePassword',
        {
          newPassword,
        }
      );
      if (response.data.success) {
        alert('비밀번호가 업데이트 되었습니다.');
        handleModalClose();
        resetState();
      }
    } catch (error) {
      console.log(error);
      alert('비밀번호를 업데이트할 수 없습니다.');
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        handleModalClose();
        resetState();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <h2 id="modal-modal-title">비밀번호 찾기 및 업데이트</h2>
        <TextField
          variant="outlined"
          type="text"
          placeholder="등록된 전화번호 입력"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button variant="contained" color="primary" onClick={findPhoneNumber}>
          검증
        </Button>
        {isVerified && (
          <div>
            <TextField
              variant="outlined"
              type="password"
              placeholder="변경할 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              type="password"
              placeholder="변경할 비밀번호 재입력"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="secondary" onClick={updatePassword}>
              수정완료
            </Button>
          </div>
        )}
        <Button variant="text" onClick={() => {
            handleModalClose();
            resetState();
          }}>
          닫기
        </Button>
      </Box>
    </Modal>
  );
};

export default FindPW;
