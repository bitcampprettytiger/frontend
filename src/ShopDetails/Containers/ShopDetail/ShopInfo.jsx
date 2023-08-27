import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Typography, IconButton } from '@mui/material';
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

function ShopInfo({ onCall, onViewLocation }) {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>No vendor data available</div>;

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {vendor.vendorType}
      </Typography>
      <StarBox>
        <StarIcon sx={{ color: '#FFC700', marginRight: 1 }} />
        <StarTypography>평점 {(vendor.weightedAverageScore || 0).toFixed(1)} </StarTypography>
        <ReviewCountTypography>
          ({vendor.reviewCount || 0})
        </ReviewCountTypography>
      </StarBox>
      <ButtonBox>
      <CallButton
        color="primary"
        component="a"
        href={`tel:${vendor.tel}`}
        startIcon={<CallIcon />}
      >
        전화 걸기
      </CallButton>
        <LocationButton onClick={onViewLocation}>
          <IconButton color="default" size="small" sx={{ marginRight: 1 }}>
            <PlaceIcon />
          </IconButton>
          위치 보기
        </LocationButton>
      </ButtonBox>
    </Container>
  );
}

export default ShopInfo;
