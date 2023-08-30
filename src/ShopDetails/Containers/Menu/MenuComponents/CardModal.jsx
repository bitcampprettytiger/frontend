import React from 'react';

const CardModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 9999 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <p>결제가 성공적으로 완료되었습니다.</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default CardModal;