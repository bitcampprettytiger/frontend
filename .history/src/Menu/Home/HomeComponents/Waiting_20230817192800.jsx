
import React, { useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Modal from '../Menu/Modal';
import './Modal.css';

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
