import React, { useRef } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Typography, IconButton, Box } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import {
  Container,
  StarBox,
  ButtonBox,
  CallButton,
  LocationButton,
  StarTypography,
  ReviewCountTypography,
} from './ShopInfoStyle';
import useVendor from '../../SDCustomHooks/useVendor';
import { useParams } from 'react-router-dom';

const displayBusinessDays = (days) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '5%' }}>
      {weekdays.map((day, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            display: "inline-block",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: days.includes(day) ? "#FD5E53" : "#E9E9E9",
            color: "white",
            textAlign: "center",
            lineHeight: "30px",
            marginRight: "20px"
          }}
        >
          {day}
        </Box>
      ))}
    </Box>
  );
};


function ShopInfo({ onCall, onViewLocation }) {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);
  const businessDays = vendor ? vendor.businessDay.split(',').map(day => day.trim()) : [];
  const businessHours = vendor ? 
    (vendor.open && vendor.close ? `${vendor.open.substring(0, 5)}~${vendor.close.substring(0, 5)}` : "사장님이 영업시간을 안 적어주셨어요") 
    : "";

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>No vendor data available</div>;

  return (
    <Container sx={{ margin: '0 5%' }}>
      <Typography variant="h6">
        {vendor.vendorName}
      </Typography>
      <div style={{margin: '5% 0', }}>이 날 영업해요</div>
      {displayBusinessDays(businessDays)}
      <Typography sx={{marginBottom: '5%'}}>
        영업 시간
        <Typography sx={{ margin: '10% 0'}}>
          {businessHours}
        </Typography>
      </Typography>
      <StarBox>
        <StarIcon sx={{ color: '#FFC700', marginRight: 1 }} />
        <StarTypography>
          평점 {(vendor.averageReviewScore || 0).toFixed(1)}{' '}
        </StarTypography>
        <ReviewCountTypography>
          ({vendor.reviewCount || 0})
        </ReviewCountTypography>
      </StarBox>
      <ButtonBox>
        <CallButton
          component="a"
          href={`tel:${vendor.tel}`}
          startIcon={<CallIcon />}
        >
          전화 걸기
        </CallButton>
        <LocationButton onClick={onViewLocation}>
          <IconButton size="small" sx={{ marginRight: 1, color: 'black' }}>
            <PlaceIcon />
          </IconButton>
          위치 보기
        </LocationButton>
      </ButtonBox>
    </Container>
  );
}

export default ShopInfo;
