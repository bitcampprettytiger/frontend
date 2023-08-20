import './Modal.css';
const Modal = ({ info, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p>{info.vendorAddress}</p>
          
        </div>
        {/* <img src={info.vendorImage} alt={info.vendorName}></img> */}
        <p>이미지</p>
        <h3>{info.vendorName}</h3>
        <div className="modal-buttons">
          <button onClick={onClose}>닫기</button>
          <button
            onClick={() => {
              /* 더 보기 로직 */
            }}
          >
            더보기
          </button>
          <button>찜하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
