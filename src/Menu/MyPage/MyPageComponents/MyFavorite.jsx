import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import { fetchMyFavoriteVendors } from '../../Home/HomeComponents/HomeApi';
import useFavoritePick from '../../../ShopDetails/SDCustomHooks/useFavoritePick';
import StarIcon from '@mui/icons-material/Star';

function MyFavorite() {
    const { toggleFavorite } = useFavoritePick();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('memberId');
    const [favoriteShops, setFavoriteShops] = useState([]);

    useEffect(() => {
        if (!token || !memberId) {
            console.error("JWT Token is not available in localStorage");
            navigate('/');
            return;
        }

        const fetchFavorites = async () => {

            try {
                const response = await fetchMyFavoriteVendors();
                if (response) {
                    console.log(response.item);
                    setFavoriteShops(response.item || []);
                    console.log("API 호출이 성공적으로 완료되었습니다.");
                    console.log('데이터를 성공적으로 받았습니다.', response);

                }
            } catch (error) {
                console.error("API 호출이 실패하였습니다.", error);
            }
        };

        fetchFavorites();
    }, [token, memberId]);

    const deleteFavorite = async (vendorName, vendorId) => {

        try {
            const response = await toggleFavorite(vendorId, true);
            console.log("응답하라!", response);
            console.log("응답 상태 코드:", response.status);
            console.log("응답 데이터:", response.data);
            await toggleFavorite(vendorId, true);
            const updatedFavorites = favoriteShops.filter(vendor => vendor.name !== vendorName);
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

            <div className="results-container">
                {favoriteShops.map(vendor => (
                    <div key={vendor.id} className="result-item">
                        <img
                            src={vendor.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                            alt="가게 이미지"
                            className="store-image"
                        />
                        <div className="result-info">
                            <p className="shop-name">{vendor.vendor.vendorName}</p>
                            <div className="rating">
                                <StarIcon style={{ color: 'goldenrod' }} /> {/* 노란색 별 아이콘 */}
                                {vendor.vendor.averageReviewScore}
                            </div>
                            <p>{vendor.vendor.vendorType} / {vendor.vendor.address}</p>
                        </div>
                        <div className="favorite-container">
                            <button onClick={() => deleteFavorite(vendor.vendorName, vendor.id)}>즐겨찾기 삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer type="myfavorite" />
        </div>
    );






}

export default MyFavorite;
