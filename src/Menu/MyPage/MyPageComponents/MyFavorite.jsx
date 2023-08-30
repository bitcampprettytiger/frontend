import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';
import React, { useState, useEffect } from 'react';
import { fetchFavoriteShopsByUserId, deleteFavoriteShop } from '../../Home/HomeComponents/HomeApi';
import { useNavigate } from 'react-router-dom';


function MyFavorite() {
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
                setFavoriteShops(response.data.favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [token, memberId, navigate]);

    const deleteFavorite = async (shopName, vendorId) => {
        try {
            await deleteFavoriteShop(vendorId, memberId);
            const updatedFavorites = favoriteShops.filter(shop => shop.name !== shopName);
            setFavoriteShops(updatedFavorites);
        } catch (error) {
            console.error("Error deleting favorite:", error);
        }
    };

    if (!token || !memberId) {
        return null;
    }

    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            {favoriteShops.map(shop => (
                <div key={shop.name} className='myfavorite-container'>
                    <img
                        src={shop.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                        alt="가게 이미지"
                        className="store-image"
                    />
                    <div className="store-info">
                        <div className="store-name">{shop.name}</div>
                        <div className="store-address">{shop.address}</div>
                    </div>
                </div>
            ))}
            <Footer type="myfavorite" />
        </div>
    );
}

export default MyFavorite;
