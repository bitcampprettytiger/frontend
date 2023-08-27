import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import useResponsive from '../SDCustomHooks/useResponsive';

const SHFooter = () => {
  const { value, setValue } = useContext(ShopHomeTabsContext);
  const navigate = useNavigate();
  const { width } = useResponsive();

  const handleLineUpClick = () => {
    navigate('/waitingDetail');
  };

  const handlePackagingClick = () => {
    setValue(1);
  };

  return (
    <Box  
        sx={{ 
            top: 'auto',
            width: width,
            height: "8%",
            background: 'white',
            display: 'flex', 
            position: "fixed",
            bottom: 0,
            flexDirection: 'row', 
            justifyContent: 'center',
        }}
        >
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button
                onClick={handleLineUpClick}
                sx={{
                    flex: 1,
                    padding: '4%',
                    margin: '1% 2%',
                    color: 'black',
                    background: 'white',
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                    border: '#E7E3E3 solid 1px' 
                }}
            >
                줄 서기
            </Button>
       
            <Button 
                onClick={handlePackagingClick}
                sx={{
                    flex: 1,
                    padding: '4%',
                    color: 'black',
                    margin: '1% 2%',
                    background: 'white',
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                    border: '#E7E3E3 solid 1px' 
                }}
            >
                포장하기
            </Button>
        </div>
    </Box>
  );
}

export default SHFooter;
