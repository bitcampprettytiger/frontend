import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import {
  Container,
  StarBox,
  ButtonBox,
  CallButton,
  LocationButton,
  StarTypography,
  ReviewCountTypography,
} from './ShopInfoStyle';

function ShopInfo({ description, reviewCount, onCall, onViewLocation }) {
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {description}
      </Typography>
      <StarBox>
        <StarIcon sx={{ color: '#FFC700', marginRight: 1 }} />
        <StarTypography>평점</StarTypography>
        <ReviewCountTypography>({reviewCount})</ReviewCountTypography>
      </StarBox>
      <ButtonBox>
        <CallButton onClick={onCall}>전화 걸기</CallButton>
        <LocationButton onClick={onViewLocation}>위치 보기</LocationButton>
      </ButtonBox>
    </Container>
  );
}

export default ShopInfo;
