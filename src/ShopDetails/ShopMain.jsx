import React, { useRef } from 'react';
import ShopAppBar from './Layouts/ShopAppBar';
import ShopImage from "./Containers/ShopDetail/ShopSwiper";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "./Layouts/ShopHomeTabs";
import useReview from './Containers/Review/ReviewCustomHook/useReview';
import { ShopHomeTabsProvider } from "./SDCustomHooks/SHTContext";
import ShopInfo from "./Containers/ShopDetail/ShopInfo";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import useVendor from "./SDCustomHooks/useVendor";

const ShopMain = () => {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);
  const locationRef = useRef(null);
  const { reviews: reviewData } = useReview(vendorId);

  if (loading) return 
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="inherit" />
    </Stack>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>No vendor data available</div>;

  const imagesFromReviews = reviewData.slice(0, 6).map(review => review.img);
  const goToLocationSection = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
        <>
            <ShopAppBar/>
            {vendor && <ShopImage vendor={vendor} />}
            <ShopInfo vendor={vendor} onViewLocation={goToLocationSection}/>
            <ShopHomeTabsProvider value={goToLocationSection} >
                <ShopHomeTabs images={imagesFromReviews} locationRef={locationRef}/>
            </ShopHomeTabsProvider>
        </>
    );
}

export default ShopMain;