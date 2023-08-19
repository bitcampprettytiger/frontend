import React from "react";
import ShopAppBar from './Components/ShopAppBar';
import ShopImage from "./Components/ShopSwiper";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "./Components/ShopHomeTabs";
import './ShopMain.css';
import { ShopHomeTabsProvider } from "./CustomHooks/SHTContext";
import shopList from "../DataEx/shop";
import review from '../DataEx/review'
import ShopInfo from "./Components/ShopInfo";

const ShopMain = () => {
    const { shopId } = useParams();
    const shop = shopList.find((shop) => shop.id === parseInt(shopId));
    const imagesFromReviews = review.slice(0, 6).map(review => review.img);

    return (
        <>
            <ShopAppBar />
            <ShopInfo />
            <hr />
            {shop && <ShopImage shop={shop} />}
            <ShopHomeTabsProvider>
                <ShopHomeTabs images={imagesFromReviews} />
            </ShopHomeTabsProvider>

        </>
    )
}

export default ShopMain;
