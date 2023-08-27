import { useState, useEffect } from 'react';

function useResponsive() {
  //mui AppBar width 설정
    const [viewType, setViewType] = useState({ type: 'BV', width: '30%' });
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setViewType({ type: 'MV', width: '100%' });
        } else {
          setViewType({ type: 'BV', width: '30%' });
        }
      }
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);
  
    return viewType;
  }
  

export default useResponsive;
