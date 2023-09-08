import React, { useRef, useEffect } from 'react';
import ShopAppBar from './Layouts/ShopAppBar';
import ShopImage from './Containers/ShopDetail/ShopSwiper';
import { useParams } from 'react-router-dom';
import ShopHomeTabs from './Layouts/ShopHomeTabs';
import useReview from './Containers/Review/ReviewCustomHook/useReview';
import { ShopHomeTabsProvider } from './SDCustomHooks/SHTContext';
import ShopInfo from './Containers/ShopDetail/ShopInfo';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import useVendor from "./SDCustomHooks/useVendor";

const ShopMain = () => {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);
  const locationRef = useRef(null);
  const { reviews: reviewData } = useReview(vendorId);

  useEffect(() => {
    if (vendor) {
      const recentShops = JSON.parse(localStorage.getItem("recentShops")) || [];
      recentShops.unshift(vendor);
      if (recentShops.length > 5) recentShops.pop();
      localStorage.setItem("recentShops", JSON.stringify(recentShops));
    }
  }, [vendor]);

  if (loading) {
    return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    );
  }
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>No vendor data available</div>;
  const imagesFromReviews = reviewData.map((review) => { console.log(review.reviewFileList); return review.reviewFileList });

  console.log(imagesFromReviews)

  const goToLocationSection = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // 배열 이잖아? -> map ? -> 하나씩 다른 컴퍼 로 보내주던가
  return (
    <>
      <ShopAppBar />
      {vendor && <ShopImage vendor={vendor} />}
      <ShopInfo vendor={vendor} onViewLocation={goToLocationSection} />
      <ShopHomeTabsProvider value={goToLocationSection}>
        <ShopHomeTabs
          images={imagesFromReviews}
          locationRef={locationRef}
          vendorId={vendorId}
        />
      </ShopHomeTabsProvider>
    </>
  );
};

export default ShopMain;
