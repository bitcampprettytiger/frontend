import React from "react";
import AirIcon from '@mui/icons-material/Air';
import WcIcon from '@mui/icons-material/Wc';

const ShopFacilities = () => {
    return (
        <div>
          <h2>편의시설</h2>
          <h6>선풍기 & 가까운 화장실 정보</h6>
          <div>
          <AirIcon/>
          <p>있음</p>
          </div>
          <div>
          <WcIcon/>
          <p>강남역 공영화장실</p>
          <p>150m</p>
          </div>
        </div>
    )
}

export default ShopFacilities;