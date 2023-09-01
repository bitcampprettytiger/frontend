import * as React from 'react';
import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ShopFacilities from '../Containers/ShopDetail/ShopFacilities';
import Location from '../Containers/ShopDetail/Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { StyledAppBar, StyledTab } from '../Layouts/ShopHomeTabsStyle';
import MenuOrderPage from '../Containers/Menu/MenuComponents/MenuOrderPage'
import ReviewDetail from '../Containers/Review/ReviewComponents/ReviewDetail'
import RatingAvg from '../Containers/Review/ReviewComponents/RatingAvg';
import HygieneStatic from '../Containers/Review/ReviewComponents/HygieneStatic';
import SHFooter from './SHFooter';
import { WrapBox } from './ShopHomeTabsStyle';
import useResponsive from '../SDCustomHooks/useResponsive';
import MenuSeeMore from '../Containers/Menu/MenuComponents/MenuSeeMore';
import PhotoSeeMore from '../Containers/Review/ReviewComponents/PhotoSeeMore';


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



export default function ShopHomeTabs({images, locationRef}) {
  const { value, setValue, handleChange } = useContext(ShopHomeTabsContext);
  const viewType = useResponsive();

  return (
    <Box sx={{ width: '100%' }}>
      <WrapBox>
        <StyledAppBar
          value={value}
          onChange={handleChange}
          aria-label="ShophHomeTabs"
          variant="sticky"
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
        <Location ref={locationRef}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MenuOrderPage/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <RatingAvg/>
          <HygieneStatic/>
          <ReviewDetail/> 
        </CustomTabPanel>
        {value === 0 && <SHFooter viewType={viewType}/>}
        </Box>
  );
}
