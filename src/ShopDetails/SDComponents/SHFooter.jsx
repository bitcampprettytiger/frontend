import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { ButtonBox } from './ShopInfoStyle';

const SHFooter = () => {
  const { value, setValue } = useContext(ShopHomeTabsContext);
  const navigate = useNavigate();

  const handleLineUpClick = () => {
    navigate('/waitingDetail');
  };

  const handlePackagingClick = () => {
    setValue(1); 
  };

  return (
    <ButtonBox 
        position="fixed"
        sx={{ 
            top: 'auto',
            bottom: 0, 
            height: '8%', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-around',
            background: 'white'
        }}
        >
        <Button
            onClick={handleLineUpClick}
            sx={{
                flex: 1, 
                marginRight: '1vw',
                padding: '2vw',
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
                marginRight: '1vw',
                padding: '2vw',
                color: 'black',
                background: 'white',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                border: '#E7E3E3 solid 1px' 
            }}
        >
            포장하기
        </Button>
        </ButtonBox>

  );
}

export default SHFooter;