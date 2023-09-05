import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useVendor from '../../SDCustomHooks/useVendor';
import { useParams } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useCopyToClipboard from '../../SDCustomHooks/useCopyToClipboard';
import { useEffect, useRef } from 'react';
import usePopup from '../../SDCustomHooks/usePopup';
import '../../SDCustomHooks/PopUp.css';

function Location(props, ref) {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);
  const mapRef = useRef(); // 지도가 생성될 div를 위한 ref
  const copyToClipboard = useCopyToClipboard();
  const { isPopupVisible, showPopup } = usePopup(500);

  const handleCopyClick = () => {
    copyToClipboard(address);
    showPopup();
  };

  useEffect(() => {
    if (vendor && window.kakao) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(vendor.y, vendor.x), // 지도의 중심좌표
        level: 3, // 지도의 레벨 (확대, 축소 정도)
      };
      const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      const marker = new window.kakao.maps.Marker({
        position: map.getCenter(), // 마커의 위치
      });
      marker.setMap(map); // 지도에 마커를 표시
    }
  }, [vendor]);

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>없는 가게 입니다.</div>;

  const address = vendor.address;

  return (
    <Box ref={ref}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: '100%', textAlign: 'left', color: 'black' }}
      >
        상세 위치 안내
      </Typography>
      <Box>
        <Box
          ref={mapRef}
          sx={{ width: '100%', height: '40vh', marginBottom: '1vh' }}
        >
          {/* 지도 추가할 곳,,, */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '5%', }} onClick={handleCopyClick}>
          <ContentCopyIcon sx={{ color: 'black', fontSize: '90%', '&:hover': {
              color: '#FD5E53'
            } }} />
          <Typography variant="body2" sx={{ marginLeft: '1vw', fontSize: '90%', color: 'black', '&:hover': {
              color: '#FD5E53'}, '&:click': {color: '#FD5E53'}
             }}>
            주소 복사하기
          </Typography>
          {isPopupVisible && (
            <div className="popup">
              <span className="popuptext show">복사</span>
            </div>
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{ fontSize: '95%', color: 'black', marginBottom: '20%' }}
        >
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
            justifyContent: 'center',
          }}
        >
          길 찾기
          <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default React.forwardRef(Location);
