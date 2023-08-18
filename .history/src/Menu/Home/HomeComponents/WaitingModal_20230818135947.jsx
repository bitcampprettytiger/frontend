import '.WaitingModal.css';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function WaitingModal({ show, handleClose }) {
    const navigate = useNavigate();

    const goToWaitingDetail = (event) => {
        event.stopPropagation();
        navigate('/waitingDetail');
        handleClose();
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleOverlayClick = () => {
        handleClose();
    };

    if (!show) return null;

    return (

        <div className={`modal-container ${show ? 'show' : ''}`} onClick={handleModalClick}>
            <button className="close-btn" onClick={handleClose}>
                <HighlightOffIcon />
            </button>
            <div className="modal-content">
                <p>줄서기 신청하기</p>
                <button onClick={goToWaitingDetail}>줄서기 버튼 신청하기</button>
            </div>
        </div>

    );
}

export default Modal;
