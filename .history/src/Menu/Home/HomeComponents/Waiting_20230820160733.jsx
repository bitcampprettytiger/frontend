import React, { useState } from 'react';
import Header from '../../../Layout/Header.jsx';
<<<<<<< HEAD
import Footer from '../../../Layout/Footer.jsx';
import Modal from './WaitingModal.jsx';
import './WaitingModal.css';
=======
import Header from '../../../Layout/Footer.jsx';
import Modal from './Modal';
import './Modal.css';
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01

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
