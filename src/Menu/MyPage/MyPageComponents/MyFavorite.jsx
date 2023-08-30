import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';
import React, { useState, useEffect } from 'react';
import useFavoritePicks from '../../../ShopDetails/SDCustomHooks/useFavoritePick.js';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteShopsByUserId } from '../../Home/HomeComponents/HomeApi';



function MyFavorite() {
    const { toggleFavorite } = useFavoritePicks(); // useFavoritePicks Hook을 이용해서 toggleFavorite을 가져옵니다.
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [favoriteShops, setFavoriteShops] = useState([]);
    const memberId = localStorage.getItem('memberId');

    useEffect(() => {
        if (!token || !memberId) {

            console.error("JWT Token is not available in localStorage");
            navigate('/');
            return;
        }

        const fetchFavorites = async () => {
            try {
                const response = await fetchFavoriteShopsByUserId(memberId, token);
                console.log("API 호출이 성공적으로 완료되었습니다.");

                console.log('데이터를 성공적으로 받았습니다.', response);

                setFavoriteShops(response.data.favorites);
            } catch (error) {
                console.error("API 호출이 실패하였습니다.", error);
            }
        };

        fetchFavorites();
    }, [token, memberId]);

    const deleteFavorite = async (vendorName, vendorId) => {
        try {
            await toggleFavorite(vendorId, true); // 즐겨찾기를 제거하므로, isFavorite을 true로 설정합니다.
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

            {favoriteShops.map(vendor => (
                <div key={vendor.name} className='myfavorite-container'>
                    <img
                        src={vendor.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                        alt="가게 이미지"
                        className="store-image"
                    />
                    <div className="store-info">
                        <div className="store-name">{vendor.name}</div>
                        <div className="store-address">{vendor.address}</div>
                        {/* 즐겨찾기 삭제 버튼을 추가합니다. */}
                        <button onClick={() => deleteFavorite(vendor.name, vendor.vendorId)}>즐겨찾기 삭제</button>
                    </div>
                </div>
            ))}

            <Footer type="myfavorite" />
        </div>
    );





}

export default MyFavorite;
