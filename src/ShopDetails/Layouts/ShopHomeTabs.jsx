import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ShopFacilities from '../Containers/ShopDetail/ShopFacilities';
import Location from '../Containers/ShopDetail/Location';
import ShopHomeTabsContext from '../SDCustomHooks/SHTContext';
import { StyledAppBar, StyledTab } from '../Layouts/ShopHomeTabsStyle';
import MenuOrderPage from '../Containers/Menu/MenuComponents/MenuOrderPage';
import ReviewDetail from '../Containers/Review/ReviewComponents/ReviewDetail';
import RatingAvg from '../Containers/Review/ReviewComponents/RatingAvg';
import HygieneStatic from '../Containers/Review/ReviewComponents/HygieneStatic';
import SHFooter from './SHFooter';
import { WrapBox } from './ShopHomeTabsStyle';
import useResponsive from '../SDCustomHooks/useResponsive';
import MenuSeeMore from '../Containers/Menu/MenuComponents/MenuSeeMore';
import PhotoSeeMore from '../Containers/Review/ReviewComponents/PhotoSeeMore';
import { motion } from 'framer-motion';
import Swipe from "react-easy-swipe";

const getSlideInFromRight = (index) => ({
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.3,
      duration: 1,
      ease: 'easeOut',
    },
  },
});

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

export default function ShopHomeTabs({ images, locationRef,vendorId }) {
  const { value, setValue, handleChange } = useContext(ShopHomeTabsContext);
  const viewType = useResponsive();
  const [positionX, setPositionX] = useState(0);
  

  const [isInView, setIsInView] = useState({
    ShopFacilities: false,
    MenuSeeMore: false,
    PhotoSeeMore: false,
    Location: false,
  });

  const onSwipeMove = (position) => {
    setPositionX(position.x); // 스와이프 중인 위치를 상태에 저장
  };

  const onSwipeEnd = () => {
    if (Math.abs(positionX) > window.innerWidth / 2) {
      if (positionX < 0 && value < 2) {
        setValue(value + 1);
      }
      else if (positionX > 0 && value > 0) {
        setValue(value - 1);
      }
    }
    setPositionX(0);
  };

  
  useEffect(() => {
    const checkScroll = () => {
      const elements = [
        {
          id: 'ShopFacilities',
          ref: document.getElementById('ShopFacilities'),
        },
        { id: 'MenuSeeMore', ref: document.getElementById('MenuSeeMore') },
        { id: 'PhotoSeeMore', ref: document.getElementById('PhotoSeeMore') },
        { id: 'Location', ref: document.getElementById('Location') },
      ];

      elements.forEach(({ id, ref }, index) => {
        if (ref && window.scrollY + window.innerHeight > ref.offsetTop) {
          setIsInView((prevState) => ({ ...prevState, [id]: true }));
        }
      });
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
    <Box sx={{ width: '100%' }}>
      <WrapBox>
        <StyledAppBar
          value={value}
          onChange={handleChange}
          aria-label="ShophHomeTabs"
          sx={{
            position: '-webkit-sticky', /* Safari */
            position: 'sticky',
            top: '10vh',
            zIndex: 5
          }}
        >
          <StyledTab label="홈" {...a11yProps(0)} />
          <StyledTab label="메뉴" {...a11yProps(1)} />
          <StyledTab label="리뷰" {...a11yProps(2)} />
        </StyledAppBar>
      </WrapBox>
      <CustomTabPanel value={value} index={0}>
        <motion.div
          id="ShopFacilities"
          initial="hidden"
          animate={isInView.ShopFacilities ? 'visible' : 'hidden'}
          variants={getSlideInFromRight(0)}
        >
          <ShopFacilities />
        </motion.div>
        <motion.div
          id="MenuSeeMore"
          initial="hidden"
          animate={isInView.MenuSeeMore ? 'visible' : 'hidden'}
          variants={getSlideInFromRight(1)}
        >
          <MenuSeeMore />
        </motion.div>
        <motion.div
          id="PhotoSeeMore"
          initial="hidden"
          animate={isInView.PhotoSeeMore ? 'visible' : 'hidden'}
          variants={getSlideInFromRight(2)}
        >
          <PhotoSeeMore images={images} />
        </motion.div>
        <motion.div
          id="Location"
          initial="hidden"
          animate={isInView.Location ? 'visible' : 'hidden'}
          variants={getSlideInFromRight(3)}
        >
          <Location ref={locationRef} vendorId={vendorId} />
        </motion.div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MenuOrderPage vendorId={vendorId}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RatingAvg />
        <HygieneStatic />
        <ReviewDetail />
      </CustomTabPanel>
      {value === 0 && <SHFooter viewType={viewType} />}
    </Box>
    </Swipe>
  );
}
