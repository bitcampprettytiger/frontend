import React from "react";
import ShopAppBar from './ShopDetailcomponent/ShopAppBar';
import ShopImage from "./ShopDetailcomponent/ShopSwiper";
import shopList from "../DataEx/shop";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "./ShopDetailcomponent/ShopHomeTabs";
import review from "../DataEx/review"
import './ShopMain.css';
import { ShopHomeTabsProvider } from "./ShopDetails/SDCustomHooks/SHTContext";

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
