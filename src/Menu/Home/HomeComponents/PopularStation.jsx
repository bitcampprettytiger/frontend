import React, { useState, useEffect } from 'react';
import Footer from '../../../Layout/Footer';
import Header from '../../../Layout/Header';
import { fetchShopsInArea } from '../HomeComponents/HomeApi';
import { useParams } from 'react-router-dom';

function PopularStation() {
    const { region } = useParams();
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [selectedRegionState, setSelectedRegionState] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    console.log("selectedArea가 찍히나여?", selectedArea);

    useEffect(() => {
        console.log("selectedArea가 찍히나여?", selectedArea);
        console.log("Region value:", region);
        setSelectedArea(region);
        setSelectedRegionState(region);

        const fetchData = async () => {
            try {
                // 여기에서 selectedRegionState를 fetchShopsInArea에 인자로 전달
                const response = await fetchShopsInArea(selectedRegionState);

                // response에서 itemlist 항목을 추출
                const shops = response?.result?.itemlist;
                if (shops && shops.length > 0) {
                    setPopularPlaces(shops);
                }
            } catch (error) {
                console.error(`Error fetching popular places data: ${error}`);
            }
        };
        fetchData();
    }, [selectedRegionState], [region]); // useEffect의 의존성 배열에 selectedRegionState 추가


    return (
        <div>
            <Header page="popularstation" selectedRegion={selectedRegionState} />

            <div className="App-main2">
                <h2>오늘 이곳은 어때요?</h2>
                <div className="outer-container">
                    <div className="inner-container">
                        {popularPlaces.map((place) => (
                            <div key={place.id} className="place-card">
                                <img
                                    src={place.primaryimgurl || 'default_image_path.jpg'}
                                    alt={place.vendorName}
                                    className="place-image"
                                />
                                <h3>{place.vendorName}</h3>
                                <p>{place.address}</p>
                                <p>별점: {place.averageReviewScore || '리뷰 없음'}</p>
                                <p>카테고리: {place.vendorType}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer type="popularstation" />
        </div>
    );
}

export default PopularStation;
