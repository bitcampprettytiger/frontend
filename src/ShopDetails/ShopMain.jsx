import React from "react";
import ShopAppBar from './SDComponents/ShopAppBar';
import ShopImage from "./SDComponents/ShopSwiper";
import shopList from "../DataEx/shop";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "./SDComponents/ShopHomeTabs";
import review from "../DataEx/review"
import './ShopMain.css';
import { ShopHomeTabsProvider } from "./SDCustomHooks/SHTContext";

const ShopMain = () => {
    const { shopId } = useParams();
    const shop = shopList.find((shop) => shop.id === parseInt(shopId));
    const imagesFromReviews = review.slice(0, 6).map(review => review.img);

    return (
        <>
            <ShopAppBar />
            {shop && <ShopImage shop={shop} />}
            <ShopHomeTabsProvider>
            <ShopHomeTabs images={imagesFromReviews} />
            </ShopHomeTabsProvider>
            
        </>
    )
}

export default ShopMain;
