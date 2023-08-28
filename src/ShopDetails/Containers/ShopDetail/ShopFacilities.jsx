import React from 'react';
import { BsFan } from 'react-icons/bs';
import {ImManWoman} from 'react-icons/im'
import WcIcon from '@mui/icons-material/Wc';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CommonTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  fontSize: '85%',
}));

const ShopFacilities = () => {
  const fanAvailable = '있음';
  const restroomLocation = '강남역 공영 화장실';

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2vh' }}>
        편의 시설
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2vh', fontSize : '92%' }}>
        선풍기 & 화장실
      </Typography>
      <Grid container alignItems="flex-start" >
        <Grid item xs={6} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <BsFan size='30%'/>
            <CommonTypography variant="body1">{fanAvailable}</CommonTypography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <ImManWoman size='30%'/>
            <CommonTypography variant="body1">{restroomLocation}</CommonTypography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopFacilities;