import React from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import Modal from './WaitingModal.jsx';
import './WaitingModal.css';
import { useWaiting } from '../SearchCustomHooks/useWaiting.jsx';  // 경로는 실제 파일 위치에 따라 수정해주세요.

const Waiting = () => {
    const { showModal, toggleModal } = useWaiting();  // 커스텀 훅에서 필요한 상태와 함수들을 가져옵니다.

    return (
        <div className='App-main2'>
            <Header page="waiting" />
            <div className='waiting-container'>
                {showModal && <Modal show={showModal} handleClose={() => toggleModal()} />}
            </div>
            <Footer type="waiting" />
        </div>
    );
}

export default Waiting;
