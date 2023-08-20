import React from "react";
import ShopAppBar from './component/ShopAppBar';
import ShopSwiper from "./component/ShopSwiper";
import shopList from "../DataEx/shop";
import { useParams } from "react-router-dom";
import ShopHomeTabs from "../ShopDetail/component/ShopHomeTabs.jsx";
import ShopMain from "../ShopDetails/ShopMain.jsx";
import review from "../DataEx/review"
import { Link } from "react-router-dom";
import './ShopMain.css';

const ShopMain = () => {
    const { shopId } = useParams();
    const shop = shopList.find((shop) => shop.id === parseInt(shopId));
    const imagesFromReviews = review.slice(0, 6).map(review => review.img);

    return (
        <>
            <ShopAppBar />
            {shop && <ShopImage shop={shop} />}
            <ShopHomeTabs images={imagesFromReviews} />
            <div className="fixed-bottom">
                <Link to="/getinLine">
                    <button className="bottom-button">줄서기</button>
                </Link>
                <Link to="/menu">
                    <button className="bottom-button">포장하기</button>
                </Link>
            </div>
        </>
    )
}

export default ShopMain;
