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

            <div className="myfavorite-container">
                {favoriteShops.map(vendor => (
                    <div key={vendor.id} className="favorite-item">
                        <div className="store-image-container">
                            <img
                                src={vendor.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                                alt="가게 이미지"
                                className="shop-image"
                            />
                        </div>
                        <div className="store-info-container">
                            <div className="store-info">
                                <p className="store-name" onClick={() => handleShopClick(vendor.vendor.id)}>{vendor.vendor.vendorName}</p>
                                <div className="rating">
                                    <StarIcon style={{ color: 'goldenrod' }} />
                                    {vendor.vendor.averageReviewScore}
                                </div>
                                <p className='fstore-address'>{vendor.vendor.vendorType} / {vendor.vendor.address}</p>
                            </div>
                            <div className="delete-btn">
                                <IconButton
                                    aria-label="like"
                                    onClick={() => deleteFavorite(vendor.vendorName, vendor.vendor.id)}
                                    sx={{
                                        color: '#FD5E53',
                                    }}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer type="myfavorite" />
        </div >
    );






}

export default MyFavorite;