import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ShopFacilities from './ShopFacilities';
import MenuSeeMore from './MenuSeeMore';
import PhotoSeeMore from './PhotoSeeMore';
import Location from './Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { InView } from 'react-intersection-observer';
import { StyledAppBar, StyledTab } from './ShopHomeTabsStyle';


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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledAppBar
          value={value}
          onChange={handleChange}
          aria-label="ShophHomeTabs"
          variant="fullWidth"
        >
          <StyledTab label="홈" {...a11yProps(0)} />
          <StyledTab label="메뉴" {...a11yProps(1)} />
          <StyledTab label="리뷰" {...a11yProps(2)} />
        </StyledAppBar>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <ShopFacilities/>
        <MenuSeeMore/>
        <InView as="div" onChange={handleVisibilityChange}>
        <PhotoSeeMore images={images}/>
        <Location/>
        </InView>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        full modal or 중첩 라우트
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        full modal or 중첩 라우트
        </CustomTabPanel>
        </Box>
  );
}
