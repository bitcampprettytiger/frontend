import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import { fetchMyFavoriteVendors } from '../../Home/HomeComponents/HomeApi';
import useFavoritePick from '../../../ShopDetails/SDCustomHooks/useFavoritePick';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorite } from './FavoriteContext';
import './MyFavorite.css';

function MyFavorite() {
    const { toggleFavorite } = useFavoritePick();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('memberId');
    const { favoriteShops, setFavoriteShops } = useFavorite(); // Using context to manage state

    // 가게를 클릭했을 때 동작하는 함수
    const handleShopClick = (vendorId) => {
        navigate(`/shophome/${vendorId}`);
        // 이 부분은 커스텀 훅에서도 처리할 수 있습니다.
    };

    useEffect(() => {
        if (!token || !memberId) {
            console.log("Component re-rendered with favoriteShops: ", favoriteShops);
            console.error("JWT Token is not available in localStorage");
            navigate('/');
            return;
        }

        const fetchFavorites = async () => {
            try {
                const response = await fetchMyFavoriteVendors();

                if (response) {
                    setFavoriteShops(response.item || []);
                }
            } catch (error) {
                console.error("API 호출이 실패하였습니다.", error);
            }
        };


        fetchFavorites();
    }, [token, memberId, favoriteShops]);

    const deleteFavorite = async (vendorName, vendorId) => {
        try {
            const response = await toggleFavorite(vendorId, true);

            const updatedFavorites = favoriteShops.filter(vendor => vendor.vendor.vendorName !== vendorName);
            setFavoriteShops(updatedFavorites);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    if (!token || !memberId) {
        return null;
    }
    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            <h3>찜한 가게는 {favoriteShops.length}개 입니다.</h3>

            <div className="myfavorite-container">
                {favoriteShops.map(vendor => (
                    <div key={vendor.id} className="result-item">
                        <img
                            src={vendor.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                            alt="가게 이미지"
                            className="store-image"
                            onClick={() => handleShopClick(vendor.vendor.id)} // 가게 이미지를 클릭하면 가게 상세 페이지로 이동

                        />
                        <div className="result-info">
                            <p className="shop-name" onClick={() => handleShopClick(vendor.vendor.id)}>{vendor.vendor.vendorName}</p> {/* 가게명을 클릭하면 가게 상세 페이지로 이동 */}
                            <div className="rating">
                                <StarIcon style={{ color: 'goldenrod' }} /> {/* 노란색 별 아이콘 */}
                                {vendor.vendor.averageReviewScore}
                            </div>
                            <p>{vendor.vendor.vendorType} / {vendor.vendor.address}</p>
                            <p onClick={() => handleShopClick(vendor.vendor.id)}>상세 정보 보기</p> {/* 나머지 정보를 클릭하면 가게 상세 페이지로 이동 */}

                        </div>
                        <div className="favorite-container">
                            <button onClick={() => deleteFavorite(vendor.vendorName, vendor.vendor.id)}>즐겨찾기 삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer type="myfavorite" />
        </div>
    );






}

export default MyFavorite;