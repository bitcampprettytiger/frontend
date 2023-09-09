import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import useResponsive from '../../ShopDetails/SDCustomHooks/useResponsive';

const FindPW = ({ openModal, handleModalClose }) => {
  const [tel, setTel] = useState('');
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [serverVerificationCode, setServerVerificationCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('');
  const resetState = () => {
    setTel('');
    setName('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsVerified(false);
    setVerificationCode('');
    setServerVerificationCode(null);
    setErrorMessage('');
    setConfirmErrorMessage('');
  };

  const width = useResponsive();

  //검증로직
  const findPhoneNumber = async () => {
    try {
      const response = await axios.post(
        'https://mukjachi.site:6443/API/validateMember',
        {
          tel,
          name,
        }
      );

      console.log(response.data);
      if (response.data.statusCode === 200) {
        setErrorMessage('정보가 일치합니다.');
        setIsVerified(true);
      } else {
        setErrorMessage('정보가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('입력한 정보가 틀렸습니다.');
    }
  };

  // 서버로부터 인증번호를 받는 코드 (가정)
  const sendVerificationCode = async () => {
    try {
      const code = await axios.post('https://mukjachi.site:6443/API/sms/send', {
        to: tel,
      });
    } catch (error) {
      console.log(error);
      setErrorMessage('입력한 정보가 틀렸습니다.');
    }
  };

  //서버에 코드 전송
  const sendServerCode = async () => {
    console.log('입력 코드', verificationCode);
    try {
      const code = await axios.post(
        'https://mukjachi.site:6443/API/sms/validateCode',
        {
          code: verificationCode,
          tel: tel,
        }
      );
      setConfirmErrorMessage('인증완료');
    } catch (error) {
      console.log(error);
      setConfirmErrorMessage('입력한 정보가 틀렸습니다.');
    }
  };

  //비밀번호 변경
  const updatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post(
        'https://mukjachi.site:6443/member/updatePassword',
        {
          name: name,
          tel: tel,
          password: newPassword,
        }
      );
      console.log(response);
      if (response.data.statusCode === 200) {
        alert('비밀번호가 변경 되었습니다.');
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
          width: width,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <h2 id="modal-modal-title">비밀번호 찾기</h2>
        <TextField
          variant="outlined"
          type="text"
          placeholder="등록된 이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          type="text"
          placeholder="등록된 전화번호 입력"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          fullWidth
          margin="normal"
        />
        {errorMessage && <p style={{ color: 'blue' }}>{errorMessage}</p>}
        <Button
          variant="contained"
          onClick={findPhoneNumber}
          sx={{
            background: '#FD5E53',
            color: 'white',
            '&:hover': {
              backgroundColor: '#FD5E53',
              color: 'white',
            },
            '&:active': {
              backgroundColor: '#FD5E53',
              color: 'white',
            },
          }}
        >
          본인 확인
        </Button>

        {isVerified && (
          <div>
            <TextField
              variant="outlined"
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              margin="normal"
              sx={{
                width: '60%',
              }}
            />

            <Button
              variant="contained"
              onClick={sendVerificationCode}
              sx={{ marginTop: '5%', marginLeft: '5%' }}
            >
              인증번호 발송
            </Button>
            {confirmErrorMessage && (
              <p style={{ color: 'blue' }}>{confirmErrorMessage}</p>
            )}
            <Button variant="contained" onClick={sendServerCode}>
              인증하기
            </Button>

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
            <Button
              variant="contained"
              color="secondary"
              onClick={updatePassword}
              sx={{
                backgroundColor: isVerified ? '#FD5E53' : 'grey', // 활성화 상태면 원래의 색, 비활성화면 회색
                color: 'white',
              }}
              disabled={!isVerified} // 여기에서 isVerified를 사용해 버튼을 활성화/비활성화
            >
              수정완료
            </Button>
            <Button
              variant="text"
              onClick={() => {
                handleModalClose();
                resetState();
              }}
              sx={{ color: '#FD5E53' }}
            >
              닫기
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default FindPW;
