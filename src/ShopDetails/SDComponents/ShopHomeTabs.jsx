import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ShopFacilities from './ShopFacilities';
import MenuSeeMore from './MenuSeeMore';
import PhotoSeeMore from './PhotoSeeMore';
import Location from './Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { StyledAppBar, StyledTab } from './ShopHomeTabsStyle';
import MenuOrderPage from '../PackagingOrder/POComponents/MenuOrderPage';
import ReviewDetail from '../Review/ReviewComponents/ReviewDetail';
import RatingAvg from '../Review/ReviewComponents/RatingAvg';
import HygieneStatic from '../Review/ReviewComponents/HygieneStatic';
import SHFooter from './SHFooter';
import { WrapBox } from './ShopHomeTabsStyle';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`} 
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ShopHomeTabs({images}) {
  const { value, setValue, handleChange, handleVisibilityChange } = useContext(ShopHomeTabsContext);

  return (
    <Box sx={{ width: '100%' }}>
      <WrapBox>
        <StyledAppBar
          value={value}
          onChange={handleChange}
          aria-label="ShophHomeTabs"
          variant="Header"
        >
          <StyledTab label="홈" {...a11yProps(0)} />
          <StyledTab label="메뉴" {...a11yProps(1)} />
          <StyledTab label="리뷰" {...a11yProps(2)} />
        </StyledAppBar>
        </WrapBox>
        <CustomTabPanel value={value} index={0}>
        <ShopFacilities/>
        <MenuSeeMore/>
        <PhotoSeeMore images={images}/>
        <Location/>
        <SHFooter/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MenuOrderPage/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {/* <RatingAvg/>
          <HygieneStatic/>
          <ReviewDetail/> */}
        </CustomTabPanel>
        </Box>
  );
}
