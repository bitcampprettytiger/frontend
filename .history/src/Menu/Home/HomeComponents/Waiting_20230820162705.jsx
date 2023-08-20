import React, { useState } from 'react';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import Modal from './WaitingModal.jsx';
import './WaitingModal.css';

const Waiting = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prev => !prev);
    };

    return (
        <div className='App-main2'>
            <Header page="waiting" />
            <div className='waiting-container'>
                {showModal && <Modal show={showModal} handleClose={() => setShowModal(false)} />}
            </div>
            <Footer type="waiting" />
        </div>
    );

}

export default Waiting;
