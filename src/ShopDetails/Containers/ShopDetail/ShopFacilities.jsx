import React from 'react';
import { BsFan } from 'react-icons/bs';
import { ImManWoman } from 'react-icons/im'; 
import { BiStoreAlt } from 'react-icons/bi'
import { TbAirConditioning } from 'react-icons/tb'
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CommonTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  fontSize: '85%',
}));

const ShopFacilities = () => {
  const fanAvailable = '있음';
  const airconAvailable = '없음'; 
  const restroomLocation = '공영 화장실';
  const shopRestroom = '가게 화장실'; 

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2vh' }}>
        편의 시설
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2vh', fontSize: '92%' }}>
        냉난방기 & 화장실
      </Typography>
      <Grid container alignItems="flex-start" >
        <Grid item xs={6} textAlign="center" sx={{marginBottom: '10%'}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <BsFan size='22%' />
            <CommonTypography variant="body1">{fanAvailable}</CommonTypography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <TbAirConditioning size='22%'/> 
            <CommonTypography variant="body1">{airconAvailable}</CommonTypography>
          </Box>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-start">
        <Grid item xs={6} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <ImManWoman size='22%' />
            <CommonTypography variant="body1">{restroomLocation}</CommonTypography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <BiStoreAlt size='22%'/>
            <CommonTypography variant="body1">{shopRestroom}</CommonTypography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopFacilities;
