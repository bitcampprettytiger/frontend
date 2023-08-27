import React from 'react';
import ShopAppBar from './Layouts/ShopAppBar';
import ShopImage from "./Containers/ShopDetail/ShopSwiper";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "./Layouts/ShopHomeTabs";
import review from "../DataEx/review"
import { ShopHomeTabsProvider } from "./SDCustomHooks/SHTContext";
import ShopInfo from "./Containers/ShopDetail/ShopInfo";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import useVendor from "./SDCustomHooks/useVendor";

const ShopMain = () => {
  const { vendorId } = useParams();
  const { vendor, error, loading } = useVendor(vendorId);

  if (loading) return 
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="inherit" />
    </Stack>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vendor) return <div>No vendor data available</div>;

  const imagesFromReviews = review.slice(0, 6).map(review => review.img);

    return (
        <>
            <ShopAppBar/>
            <ShopInfo vendor={vendor} />
            {vendor && <ShopImage vendor={vendor} />}
            <ShopHomeTabsProvider>
                <ShopHomeTabs images={imagesFromReviews} />
            </ShopHomeTabsProvider>
        </>
    );
}

export default ShopMain;