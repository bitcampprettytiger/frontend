import React, { useState } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyEdit.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PendingIcon from '@mui/icons-material/Pending';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InfoIcon from '@mui/icons-material/Info';


function MyEdit() {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState("닉네임");
    const [newNickname, setNewNickname] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isToggled, setIsToggled] = useState(true);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [open, setOpen] = useState(false);


    const handleToggleClick = () => {
        setIsToggled(!isToggled);
    };
    const handleEditClick = () => {
        setIsEditing(true);
        setNewNickname(nickname);
    };

    const handleSaveClick = () => {
        setNickname(newNickname);
        setIsEditing(false);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setNewNickname(e.target.value);
    };
    const handleTermsClick = () => {
        setShowTermsModal(true);
    };

    const handlePrivacyClick = () => {
        setShowPrivacyModal(true);
    };

    const handleTermsClose = () => {
        setShowTermsModal(false);
    };

    const handlePrivacyClose = () => {
        setShowPrivacyModal(false);
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // App-main2의 width에 맞게 조정
        height: '80%', // App-main2의 height에 맞게 조정
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };


    return (
        <div className='App-main2'>
            <Header page="myedit" />
                <Box
                    sx={{
                        backgroundColor: 'darkgray', // 진한 회색 배경 적용
                        padding: '5%', // 패딩 적용
                        marginBottom: '1em' // 아래 버튼들과의 간격 조절
                    }}>
                    {isEditing ? (
                        <div className="nickname-edit">
                            <input
                                type="text"
                                value={newNickname}
                                onChange={handleChange}
                                className="nickname-input"
                            />
                            <Button onClick={handleSaveClick}>변경</Button>
                            <Button onClick={handleCancelClick}>취소</Button>
                        </div>
                    ) : (
                        <div className="nickname-display">
                            <p className="nickname-text">{nickname}</p>
                            <Button onClick={handleEditClick}>
                                <PlayCircleOutlineIcon />
                            </Button>
                        </div>
                    )}

                    {showModal && <div className="modal">닉네임이 변경 되었습니다.</div>}
                </Box>
            <div className='myedit-container'>


                <div className='button-container'>
                    <button className='left-button'>
                        <NotificationsActiveIcon />
                        푸시 알림
                    </button>
                    <button className='right-button' onClick={handleToggleClick}>
                        {isToggled ? <ToggleOnIcon /> : <ToggleOffIcon />}
                    </button>
                </div>

                <div onClick={handleTermsClick} className="button-container">
                    <Button>
                        <PendingIcon />
                        이용약관
                        <KeyboardArrowRightIcon />
                    </Button>
                </div>

                <Modal
                    open={showTermsModal}
                    onClose={handleTermsClose}
                    aria-labelledby="terms-modal-title"
                    aria-describedby="terms-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="terms-modal-title" variant="h6" component="h2">
                            이용약관
                        </Typography>
                        <Typography id="terms-modal-description" sx={{ mt: 2 }}>
                            이용약관의 내용이 여기에 표시됩니다.
                        </Typography>
                        <Button onClick={handleTermsClose}>닫기</Button>
                    </Box>
                </Modal>

                <div onClick={handlePrivacyClick} className="button-container">
                    <Button>
                        <PendingIcon />
                        개인정보처리방침
                        <KeyboardArrowRightIcon />
                    </Button>
                </div>
                <hr style={{ borderTop: '2px solid black', width: '100%', margin: '20px 0' }} /> {/* 구분선 추가 */}


                <Modal
                    open={showPrivacyModal}
                    onClose={handlePrivacyClose}
                    aria-labelledby="privacy-modal-title"
                    aria-describedby="privacy-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="privacy-modal-title" variant="h6" component="h2">
                            개인정보처리방침
                        </Typography>
                        <Typography id="privacy-modal-description" sx={{ mt: 2 }}>
                            개인정보처리방침의 내용이 여기에 표시됩니다.
                        </Typography>
                        <Button onClick={handlePrivacyClose}>닫기</Button>
                    </Box>
                </Modal>
                <div className="button-wrapper">
                    <div className="left-button-container">
                        {/* 이미지와 텍스트를 포함하는 버튼입니다. */}
                        <Button>
                            <img src="path_to_your_image.jpg" alt="button-icon" style={{ marginRight: '10px' }} />
                            버튼 텍스트
                        </Button>
                    </div>
                    <div className="right-button-container">
                        <Button>로그아웃</Button>
                    </div>
                </div>

                <div className="deactivate-button-container">
                    <Button>
                        <InfoIcon style={{ marginRight: '10px' }} /> {/* 아이콘 추가 */}
                        회원탈퇴
                    </Button>
                </div>
            </div>

            <Footer type="myedit" />
        </div>
    );

}
export default MyEdit;
