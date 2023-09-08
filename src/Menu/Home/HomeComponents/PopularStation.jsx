import React, { useState, useEffect } from 'react';
import Footer from '../../../Layout/Footer';
import Header from '../../../Layout/Header';
import { fetchShopsInArea } from '../HomeComponents/HomeApi';
import { useNavigate, useParams } from 'react-router-dom';
import './PopularStation.css';
import StarIcon from '@mui/icons-material/Star';

function PopularStation() {
    const { region } = useParams();
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [selectedRegionState, setSelectedRegionState] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);  // 더 로드할 데이터가 있는지 확인
    const [page, setPage] = useState(1);  // 현재 페이지 번호
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate.goBack();
    };

    console.log("selectedArea가 찍히나여?", selectedArea);

    useEffect(() => {
        setSelectedArea(region);
        setSelectedRegionState(region);
    }, [region]);

    useEffect(() => {
        if (!hasMore) return;  // 더 이상 로드할 데이터가 없으면 return

        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetchShopsInArea(selectedRegionState, page);  // 페이지 번호를 인자로 전달
                const shops = response?.result?.itemlist;

                if (shops && shops.length > 0) {
                    setPopularPlaces(prevPlaces => [...prevPlaces, ...shops]);  // 이전 데이터와 새로운 데이터 결합
                } else {
                    setHasMore(false);  // 더 이상 데이터가 없다면 hasMore를 false로 설정
                }
            } catch (error) {
                console.error(`Error fetching popular places data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedRegionState, page]);

    const handleScroll = (event) => {
        if (isLoading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 100) {  // 100은 트리거 포인트(픽셀 단위)로 조절할 수 있습니다.
            setPage(prevPage => prevPage + 1);  // 다음 페이지 데이터 로드
        }
    };

    return (
        <div>
            <Header page="popularstation" selectedRegion={selectedRegionState} onBackClick={handleBackButtonClick} />

            <div className="App-main2" onScroll={handleScroll} style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
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
                                <div className="place-info">
                                    <h3>{place.vendorName}</h3>
                                    <div className="rating">
                                        <StarIcon style={{ color: '#d4af37', verticalAlign: 'middle' }} />
                                        {place.averageReviewScore || '리뷰 없음'}
                                    </div>
                                    <div className="category-address">
                                        <p>{place.vendorType}</p>
                                        <span> / </span>
                                        <p>{place.address}</p>
                                    </div>
                                </div>
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
