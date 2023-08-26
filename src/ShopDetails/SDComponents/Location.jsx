import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useVendor from '../SDCustomHooks/useVendor';
import { useParams } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useCopyToClipboard from '../SDCustomHooks/useCopyToClipboard';

function Location() {
  const {vendorId} = useParams();
  const { vendor, error, loading } = useVendor(vendorId);
  const copyToClipboard = useCopyToClipboard();

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
      <Box>
        <Box sx={{ width: '80vw', height: '20vh', marginBottom: '1vh' }}>
          {/* 지도 추가할 곳,,, */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => copyToClipboard(address)}>
          <ContentCopyIcon sx={{ color: 'black', fontSize: '90%' }} />
          <Typography variant="body2" sx={{ marginLeft: '1vw', fontSize: '90%', color: 'black' }}>
            주소 복사하기
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '95%', color: 'black', marginBottom: '20%' }}>
          {address}
        </Typography>
        <Button
          variant="outlined"
          sx={{
              width: '100%', 
              borderColor: '#000000',
              borderWidth: '1px',
              color: '#000000',
              fontSize: '90%',
              justifyContent: 'center'
          }}
        >
          길 찾기
          <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default Location;
