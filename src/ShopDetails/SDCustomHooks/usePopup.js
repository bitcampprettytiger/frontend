// usePopup.js
import { useState, useEffect } from 'react';

function usePopup(duration = 1000) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setPopupVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isPopupVisible, duration]);

  return { isPopupVisible, showPopup };
}

export default usePopup;
