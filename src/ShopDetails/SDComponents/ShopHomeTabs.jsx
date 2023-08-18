import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ShopFacilities from './ShopFacilities';
import MenuSeeMore from './MenuSeeMore';
import PhotoSeeMore from './PhotoSeeMore';
import Location from './Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { InView } from 'react-intersection-observer';
import { AppBar, CustomTab, CustomTabPanel } from './ShopHomeTabsStyle';


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
        <AppBar value={value} onChange={handleChange}>
          <CustomTab label="홈" {...a11yProps(0)} />
          <CustomTab label="메뉴" {...a11yProps(1)} />
          <CustomTab label="리뷰" {...a11yProps(2)} />
        </AppBar>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ShopFacilities />
        <MenuSeeMore />
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
