import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';
import React, { useState, useEffect } from 'react';
import { fetchFavoriteShopsByUserId, deleteFavoriteShop } from '../../Home/HomeComponents/HomeApi';
import { useNavigate } from 'react-router-dom';

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } catch (error) {
        console.error("Error parsing JWT:", error);
        return null;
    }
}

function MyFavorite() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    let store = [];

    try {
        store = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!Array.isArray(store)) {
            store = [];
        }
    } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
    }

    const [favoriteShops, setFavoriteShops] = useState(store);

    useEffect(() => {
        if (!token) {
            console.error("JWT Token is not available in localStorage");
            navigate('/');
            return;
        }

        const payload = parseJwt(token);
        const MEMBER_ID = payload?.memberId || null;

        if (!MEMBER_ID) {
            console.error("MEMBER_ID is undefined");
            return;
        }

        fetchFavoriteShopsByUserId(MEMBER_ID, token)
            .then(response => {
                console.log(response);
                setFavoriteShops(response.data.favorites);
            })
            .catch(error => {
                console.error("즐겨찾기 목록을 불러오는 중 오류 발생:", error);
            });

    }, [token, navigate]);

    function deleteFavorite(shopName, vendorId) {
        const payload = parseJwt(token);
        const MEMBER_ID = payload?.memberId || null;

        deleteFavoriteShop(MEMBER_ID, vendorId)
            .then(() => {
                const updatedFavorites = favoriteShops.filter(shop => shop.name !== shopName);
                setFavoriteShops(updatedFavorites);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            })
            .catch(error => {
                console.error("즐겨찾기 게시글을 삭제하는 중 오류 발생:", error);
            });
    }

    if (!token) {
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
