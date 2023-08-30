import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import { fetchMyFavoriteVendors } from '../../Home/HomeComponents/HomeApi';
import useFavoritePick from '../../../ShopDetails/SDCustomHooks/useFavoritePick';

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
                const response = await fetchMyFavoriteVendors(); // 이 부분을 변경했습니다.
                if (response) {
                    console.log(response);
                    console.log("API 호출이 성공적으로 완료되었습니다.");
                    console.log('데이터를 성공적으로 받았습니다.', response);
                    setFavoriteShops(response.favorites || []); // response의 구조에 따라 적절하게 변경
                }
            } catch (error) {
                console.error("API 호출이 실패하였습니다.", error);
            }
        };

        fetchFavorites();
    }, [token, memberId]);

    const deleteFavorite = async (vendorName, vendorId) => {
        try {
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
