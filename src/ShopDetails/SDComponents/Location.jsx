import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyPaste from '../SDCustomHooks/useCopyPaste';
import useVendor from '../SDCustomHooks/useVendor';
import { useParams } from 'react-router-dom';

function Location() {
  const [isCopied, copyToClipboard] = useCopyPaste();
  const {vendorId} = useParams();
  const { vendor, error, loading } = useVendor(vendorId);

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>없는 가게 입니다.</div>; 
  
  const address = vendor.address;

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: '100%', textAlign: 'left', color: 'black' }}
      >
        상세 위치 안내
      </Typography>
      <Box sx={{ width: '80vw', height: '20vh', marginBottom: '1vh' }}>
        {/* 지도 추가할 곳,,, */}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => copyToClipboard(address)}>
        <ContentCopyIcon sx={{ color: 'black', fontSize: '90%' }} />
        <Typography variant="body2" sx={{ marginLeft: '1vw', fontSize: '90%', color: 'black' }}>
          주소 복사하기
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontSize: '95%', color: 'black', marginBottom: '1vh' }}>
        {address}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderRadius: '10px',
          borderColor: 'black',
          borderWidth: '0.8px',
          width: '80vw',
          height: '50px',
        }}
      >
        매장 길찾기
      </Button>
    </Box>
  );
}

export default Location;
