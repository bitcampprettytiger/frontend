import * as React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShopFacilities from './ShopFacilities';
import MenuSeeMore from './MenuSeeMore';
import PhotoSeeMore from './PhotoSeeMore';
import Location from './Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { InView } from 'react-intersection-observer';


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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="ShophHomeTabs"
        sx={{
          '& .Mui-selected': {
            fontWeight: 'bold',
            color: 'black',
          },
          '& .MuiTabs-indicator': {
            bgcolor: '#FF745A',
          },
        }}
      >
        <Tab
          label="홈"
          {...a11yProps(0)}
          sx={{ fontSize: '115%' }}
        />
        <Tab
          label="메뉴"
          {...a11yProps(1)}
          sx={{ fontSize: '115%' }}
        />
        <Tab
          label="리뷰"
          {...a11yProps(2)}
          sx={{ fontSize: '115%' }}
        />
        </Tabs>
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
